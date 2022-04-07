import create from 'zustand'

const useStore = create(set => ({
    phantomWalletInstalled: false,
    walletAddress: null,
    walletBalance: null,
    walletAccounts: [],
    setPhantomWalletInstalled: v => set({ phantomWalletInstalled: v }),
    setWalletAddress: v => set({ walletAddress: v }),
    setWalletBalance: v => set({ walletBalance: v }),
    addNewWalletAccount: v => set({ walletAccounts: [ v ] })
}))

export default useStore