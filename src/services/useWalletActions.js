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
    createMintToInstruction,
    getOrCreateAssociatedTokenAccount,
    getMint,
    mintTo,
    getAccount
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
                token,
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

    const mint2 = async destination => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

            const payer = Keypair.generate()
            const fromAirdropSignature = await connection.requestAirdrop(payer.publicKey, 1 * LAMPORTS_PER_SOL)
            await connection.confirmTransaction(fromAirdropSignature)

            // const mintInfo = await getMint(connection, selectedToken.token)
            // console.log('MINT INFO', mintInfo)

            // console.log(
            //     'Conn', connection,
            //     'Sel Wall', selectedAccount,
            //     'Sel Tok', selectedToken,
            //     'Pub Key', new PublicKey('CVN4v7A5D29N9VeWGhMVFT59aKH9vrjTST1h9x7VfBwT')
            // )

            // const mintInf = await mintTo(
            //     connection,
            //     selectedAccount.wallet,
            //     selectedToken.token,
            //     new PublicKey('CVN4v7A5D29N9VeWGhMVFT59aKH9vrjTST1h9x7VfBwT'),
            //     selectedToken.mintAuthority,
            //     100
            // )

            // console.log(mintInf)
            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                payer,
                selectedToken.token,
                new PublicKey('CVN4v7A5D29N9VeWGhMVFT59aKH9vrjTST1h9x7VfBwT')
            )

            console.log(tokenAccount)

            let tokenAccountInfo = await getAccount(
                connection,
                tokenAccount.address
            )

            console.log('TOK ACC INFO', tokenAccountInfo)

            await mintTo(
                connection,
                payer,
                selectedToken.token,
                tokenAccount.address,
                selectedToken.mintAuthority,
                100
            )

            tokenAccountInfo = await getAccount(
                connection,
                tokenAccount.address
            )

            console.log('TOK ACC INFO', tokenAccountInfo)
        } catch (error) {
            console.error(error)
        }
    }

    const test = async () => {
        const payer = Keypair.generate()
        const mintAuthority = Keypair.generate()
        const freezeAuthority = Keypair.generate()

        const connection = new Connection(
            clusterApiUrl('devnet'),
            'confirmed'
        )

        const fromAirdropSignature = await connection.requestAirdrop(payer.publicKey, 1 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSignature)

        const mint = await createMint(
            connection,
            payer,
            mintAuthority.publicKey,
            freezeAuthority.publicKey,
            9
        )

        console.log('MINT', mint, mint.toBase58())

        let mintInfo = await getMint(
            connection,
            mint
        )

        console.log('SUPPLY', mintInfo, mintInfo.supply)

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
        )

        console.log('TOKEN ACC', tokenAccount.address.toBase58())

        let tokenAccountInfo = await getAccount(
            connection,
            tokenAccount.address
        )

        console.log('TOK ACC INFO', tokenAccountInfo)

        await mintTo(
            connection,
            payer,
            mint,
            new PublicKey('CVN4v7A5D29N9VeWGhMVFT59aKH9vrjTST1h9x7VfBwT'),
            mintAuthority,
            100
        )

        mintInfo = await getMint(
            connection,
            mint
        )

        console.log('SUPPLY', mintInfo, mintInfo.supply)

        tokenAccountInfo = await getAccount(
            connection,
            tokenAccount.address
        )

        console.log('TOK ACC INFO', tokenAccountInfo)
    }

    return {
        loading,
        visitPhantomWallet,
        connectPhantomWallet,
        getWalletBalance,
        airdropSol,
        createNewWalletAccount,
        createNewToken,
        mintToken,
        mint2,
        test
    }
}