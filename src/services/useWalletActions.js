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
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const wallet = Keypair.generate()

        const fromAirdropSignature = await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSignature)

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
                mintAuthority: selectedAccount.wallet,
                mintAuthorityPublicKey: selectedAccount.wallet.publicKey.toString()
            })
        } catch (error) {
            console.error(error)
        }
    }

    const mintToken = async destination => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                selectedAccount.wallet,
                selectedToken.token,
                new PublicKey(destination)
            )

            await mintTo(
                connection,
                selectedAccount.wallet,
                selectedToken.token,
                tokenAccount.address,
                selectedToken.mintAuthority,
                1000000
            )
        } catch (error) {
            console.error(error)
        }
    }

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