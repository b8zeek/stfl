import { useState } from 'react'
import {
    PublicKey,
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    Keypair,
    Transaction,
    sendAndConfirmTransaction
} from '@solana/web3.js'

import {
    createMint,
    TOKEN_PROGRAM_ID,
    createTransferInstruction
} from '@solana/spl-token'

import useStore from '@/store'

export function useWalletActions() {
    const walletAddress = useStore(state => state.walletAddress)
    const setWalletAddress = useStore(state => state.setWalletAddress)
    const setPhantomWalletInstalled = useStore(state => state.setPhantomWalletInstalled)
    const setWalletBalance = useStore(state => state.setWalletBalance)

    const [loading, setLoading] = useState(true)

    const visitPhantomWallet = () => window.open('https://phantom.app/', '_blank')

    const connectPhantomWallet = async (onlyIfTrusted = true) => {
        setLoading(true)

        try {
            const { solana } = window

            if (solana?.isPhantom) {
                setPhantomWalletInstalled(true)

                const response = onlyIfTrusted ?
                await solana.connect({ onlyIfTrusted: true }) :
                await solana.connect()

                const walletAddress = response.publicKey.toString()

                setWalletAddress(walletAddress)
            } else {
                setPhantomWalletInstalled(false)
                if (!onlyIfTrusted) visitPhantomWallet()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getWalletBalance = async () => {
        try {
            const publicKey = new PublicKey(walletAddress)
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
            const walletBalace = await connection.getBalance(publicKey)

            setWalletBalance(walletBalace)
        } catch (error) {
            console.error(error)
        }
    }

    const airdropSol = async () => {
        try {
            const publicKey = new PublicKey(walletAddress)
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
            const fromAirdropSignature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL)

            await connection.confirmTransaction(fromAirdropSignature)

            getWalletBalance()
        } catch (error) {
            console.error(error)
        }
    }

    const createNewToken = async () => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

            const keypair = Keypair.generate()
            console.log('Solana Public Address: ' + keypair.publicKey.toString())

            const fromAirdropSignature = await connection.requestAirdrop(keypair.publicKey, 1000000000)
            await connection.confirmTransaction(fromAirdropSignature)

            const mint = await createMint(
                connection,
                keypair,
                keypair.publicKey,
                null,
                9,
                TOKEN_PROGRAM_ID
            )

            console.log('Mint Public Address: ' + mint.publicKey.toString())

            const token = await mint.getOrCreateAssociatedAccountInfo(keypair.publicKey)

            console.log('Token Public Address: ' + token.address.toString())

            await mint.mintTo(token.address, keypair.publicKey, [], 1000000000)
            console.log('DONE')
        } catch (error) {
            console.error(error)
        }
    }

    const mintToken = async () => {
        const publicKey = new PublicKey(walletAddress)
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

        const fromWallet = Keypair.generate()

        console.log("Creator's Minting wallet public key: ",fromWallet.publicKey.toString());
        console.log(fromWallet.secretKey.toString());

        const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, 1 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSignature)
        console.log('Airdropped (transferred) 1 SOL to the fromWallet to carry out minting operations')

        const mint = await createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            fromWallet.publicKey,
            6
        )

        console.log('MINT', mint.toString())

        let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(fromWallet.publicKey)
        let toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(publicKey)

        await mint.mintTo(
            fromTokenAccount.address,
            fromWallet.publicKey,
            [],
            1000000
        )

        console.log('Initial mint successful')

        const transaction = new Transaction().add(
            createTransferInstruction(
                TOKEN_PROGRAM_ID,
                fromTokenAccount.address,
                toTokenAccount.address,
                fromWallet.publicKey,
                [],
                1000000
            )
        )

        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [ fromWallet ],
            { commitment: 'confirmed' }
        )

        const creatorTokenAddress = mint.publicKey
        const creatorTokenAddressString = mint.publicKey.toString()

        console.log('SIGNATURE: ', signature)
        console.log('Creator Token Address: ', creatorTokenAddressString)
        console.log('Creator Minting Wallet Address: ', mint.payer.publicKey.toString())

        let creatorTokenBalance = await toTokenAccount.amount
        console.log('Creators Token Balance: ', creatorTokenBalance)
    }

    return {
        loading,
        visitPhantomWallet,
        connectPhantomWallet,
        getWalletBalance,
        airdropSol,
        createNewToken,
        mintToken
    }
}