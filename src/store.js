import create from 'zustand'

const useStore = create(set => ({
    phantomWalletInstalled: false,
    walletAddress: null,
    walletBalance: null,
    walletAccounts: [],
    selectedWallet: null,
    setPhantomWalletInstalled: v => set({ phantomWalletInstalled: v }),
    setWalletAddress: v => set({ walletAddress: v }),
    setWalletBalance: v => set({ walletBalance: v }),
    addNewWalletAccount: v => set(state => ({
        walletAccounts: [ ...state.walletAccounts, v ]
    })),
    setSelectedWallet: v => set({ selectedWallet: v })
}))

export default useStore