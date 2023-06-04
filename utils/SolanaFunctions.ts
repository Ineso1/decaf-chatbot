import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';


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
  wallet?: any;
}

export const connectToPhantomWallet = async () => {
  const provider = window.solana;
  if (!provider) {
    throw new Error("Phantom wallet not found");
  }
  if (!provider.isPhantom) {
    throw new Error("Please install Phantom wallet");
  }
  const wallet = await provider.connect();
  const publicKey = provider.publicKey;
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / 1000000000;
  const credentials: Credentials = { publicKey, balance, balanceInSol, wallet };
  return credentials;
};

export function ellipsizeAddress(str: string) {
  if (str.length > 35) {
    return str.slice(0, 5) + "..." + str.slice(str.length - 5, str.length);
  }
  return str;
}

interface TransferData {
  fromWallet: string;
  toAddress: string;
  amount: number;
}

export async function signAndSend({fromWallet, toAddress, amount}: TransferData) {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const resp = await window.solana.connect();
  const wallet = resp;
  if (!wallet) {
    throw new Error("Phantom wallet not found");
  }
  const publicKey = wallet.publicKey;
  const transaction = new Transaction()
  const lamports = amount * LAMPORTS_PER_SOL; 
  try {
    console.log("Dest", toAddress)
    const destPubKey = new PublicKey(toAddress);
    const walletAccountInfo = await connection.getAccountInfo(publicKey);
    const receiverAccountInfo = await connection.getAccountInfo(destPubKey);
    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: destPubKey,
      lamports,
    });
    let trans = await setWalletTransaction(instruction, connection);
    let signature = await signAndSendTransaction(wallet, trans, connection);
  } catch (error){
    console.log("Error", error);
  }
  async function setWalletTransaction(instruction: any, connection: Connection) {
    const transaction = new Transaction();
    transaction.add(instruction);
    transaction.feePayer = publicKey;
    let hash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = hash.blockhash;
    return transaction;
  }

  async function signAndSendTransaction(wallet: any, transaction: Transaction, connection: Connection) {
    const {signature} = await window.solana.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature);
    return signature;
  }


    
  
}


