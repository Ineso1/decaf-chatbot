import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

export const connectToWallet = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const wallet = window.solana;
  if (!wallet) {
    throw new Error("Phantom wallet not found");
  }
  const publicKey = wallet.publicKey;
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / 1000000000;
  return { wallet, publicKey, balance, balanceInSol };
};

interface Credentials {
  publicKey: string;
  balance: number;
  balanceInSol: number;
  isConnected?: boolean;
}

export const connectToPhantomWallet = async () => {
  const provider = window.solana;
  if (!provider) {
    throw new Error("Phantom wallet not found");
  }
  if (!provider.isPhantom) {
    throw new Error("Please install Phantom wallet");
  }
  await provider.connect();
  const publicKey = provider.publicKey;
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / 1000000000;
  const credentials: Credentials = { publicKey, balance, balanceInSol };
  return credentials;
};

export function ellipsizeAddress(str: string) {
  if (str.length > 35) {
    return str.slice(0, 5) + "..." + str.slice(str.length - 5, str.length);
  }
  return str;
}

export async function sendMoney(
  connection: Connection,
  fromWallet: any,
  toAddress: string,
  amount: number
) {
  const fromPublicKey = fromWallet.publicKey;
  const toPublicKey = new PublicKey(toAddress);
  const balanceNeeded = await connection.getMinimumBalanceForRentExemption(0);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromPublicKey,
      toPubkey: toPublicKey,
      lamports: amount,
    })
  );
  transaction.feePayer = fromPublicKey;
  const [firstNode] = await connection.getClusterNodes();
  const { blockhash } = await firstNode.connection.getRecentBlockhash("max");
  transaction.recentBlockhash = blockhash;
  transaction.sign(fromWallet);
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    fromWallet,
  ]);
  console.log("Transaction sent:", signature);
}
