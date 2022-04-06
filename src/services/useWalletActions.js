import useStore from 'store'

export function useWalletActions() {
    const setWalletAddress = useStore(state => state.setWalletAddress)
    const setPhantomWalletInstalled = useStore(state => state.setPhantomWalletInstalled)

    const connectPhantomWallet = async (onlyIfTrusted = true) => {
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
                if (!onlyIfTrusted) window.open('https://phantom.app/', '_blank')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { connectPhantomWallet }
}