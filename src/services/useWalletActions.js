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
    createTransferInstruction,
    createMintToInstruction
} from '@solana/spl-token'

import useStore from '@store'

export function useWalletActions() {
    const walletAddress = useStore(state => state.walletAddress)
    const setWalletAddress = useStore(state => state.setWalletAddress)
    const setPhantomWalletInstalled = useStore(state => state.setPhantomWalletInstalled)
    const setWalletBalance = useStore(state => state.setWalletBalance)
    const addNewWalletAccount = useStore(state => state.addNewWalletAccount)
    const selectedAccount = useStore(state => state.selectedAccount)
    const addNewToken = useStore(state => state.addNewToken)
    const selectedToken = useStore(state => state.selectedToken)

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

                console.log('WALLET', response)

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

    const createNewWalletAccount = async name => {
        const wallet = Keypair.generate()

        const publicKey = wallet.publicKey.toString()

        addNewWalletAccount({
            name,
            wallet,
            publicKey
        })
    }

    const createNewToken = async () => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

            const fromAirdropSignature = await connection.requestAirdrop(selectedAccount.wallet.publicKey, 1 * LAMPORTS_PER_SOL)
            await connection.confirmTransaction(fromAirdropSignature)

            const token = await createMint(
                connection,
                selectedAccount.wallet,
                selectedAccount.wallet.publicKey,
                selectedAccount.wallet.publicKey,
                6
            )

            addNewToken({
                tokenAddress: token.toString(),
                mintAuthority: selectedAccount.wallet.publicKey.toString()
            })
        } catch (error) {
            console.error(error)
        }
    }

    const mintToken = async destination => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

            const transactionInstruction = await createMintToInstruction(
                selectedToken.tokenAddress,
                destination,
                selectedToken.mintAuthority,
                1
            )

            console.log('TRANSACTION ISNTRUCTION', transactionInstruction)

            const transaction = new Transaction().add(transactionInstruction)

            console.log('TRANSACTION', transaction)

            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [ selectedAccount.wallet ],
                { commitment: 'confirmed' }
            )

            console.log('TRANSACTION SIGNATURE', signature)
        } catch (error) {
            console.error(error)
        }
    }

    // const mintTokenssss = async () => {
    //     const publicKey = new PublicKey(walletAddress)
    //     const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    //     const fromWallet = Keypair.generate()

    //     console.log("Creator's Minting wallet public key: ",fromWallet.publicKey.toString());
    //     console.log(fromWallet.secretKey.toString());

    //     const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, 1 * LAMPORTS_PER_SOL)
    //     await connection.confirmTransaction(fromAirdropSignature)
    //     console.log('Airdropped (transferred) 1 SOL to the fromWallet to carry out minting operations')

    //     const mint = await createMint(
    //         connection,
    //         fromWallet,
    //         fromWallet.publicKey,
    //         fromWallet.publicKey,
    //         6
    //     )

    //     console.log('MINT', mint.toString())

    //     let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(fromWallet.publicKey)
    //     let toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(publicKey)

    //     await mint.mintTo(
    //         fromTokenAccount.address,
    //         fromWallet.publicKey,
    //         [],
    //         1000000
    //     )

    //     console.log('Initial mint successful')

    //     const transaction = new Transaction().add(
    //         createTransferInstruction(
    //             TOKEN_PROGRAM_ID,
    //             fromTokenAccount.address,
    //             toTokenAccount.address,
    //             fromWallet.publicKey,
    //             [],
    //             1000000
    //         )
    //     )

    //     const signature = await sendAndConfirmTransaction(
    //         connection,
    //         transaction,
    //         [ fromWallet ],
    //         { commitment: 'confirmed' }
    //     )

    //     const creatorTokenAddress = mint.publicKey
    //     const creatorTokenAddressString = mint.publicKey.toString()

    //     console.log('SIGNATURE: ', signature)
    //     console.log('Creator Token Address: ', creatorTokenAddressString)
    //     console.log('Creator Minting Wallet Address: ', mint.payer.publicKey.toString())

    //     let creatorTokenBalance = await toTokenAccount.amount
    //     console.log('Creators Token Balance: ', creatorTokenBalance)
    // }

    return {
        loading,
        visitPhantomWallet,
        connectPhantomWallet,
        getWalletBalance,
        airdropSol,
        createNewWalletAccount,
        createNewToken,
        mintToken
    }
}