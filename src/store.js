import create from 'zustand'

const useStore = create(set => ({
    phantomWalletInstalled: false,
    walletAddress: null,
    setPhantomWalletInstalled: v => set({ phantomWalletInstalled: v }),
    setWalletAddress: v => set({ walletAddress: v })
}))

export default useStore