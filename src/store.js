import create from 'zustand'

const useStore = create(set => ({
    phantomWalletInstalled: false,
    walletAddress: null,
    walletBalance: null,
    setPhantomWalletInstalled: v => set({ phantomWalletInstalled: v }),
    setWalletAddress: v => set({ walletAddress: v }),
    setWalletBalance: v => set({ walletBalance: v })
}))

export default useStore