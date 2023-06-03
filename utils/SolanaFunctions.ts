import { Connection, PublicKey } from "@solana/web3.js";

export const connectToWallet = async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const wallet = window.solana;
    if (!wallet) {
        throw new Error("Phantom wallet not found");
    }
    const publicKey = wallet.publicKey;
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / 1000000000;
    return { wallet, publicKey, balance, balanceInSol };
}

interface Credentials {
    publicKey: string;
    balance: number;
    balanceInSol: number;
}

export const connectToPhantomWallet = async () => {
    const provider = window.solana;
    if (!provider) {
        throw new Error('Phantom wallet not found');
    }
    if (!provider.isPhantom) {
        throw new Error('Please install Phantom wallet');
    }
    await provider.connect();
    const publicKey = provider.publicKey;
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / 1000000000;
    const credentials: Credentials = { publicKey, balance, balanceInSol };
    return credentials;
};
