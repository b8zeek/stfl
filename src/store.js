import create from 'zustand'

const useStore = create(set => ({
    phantomWalletInstalled: false,
    walletAddress: null,
    walletBalance: null,
    walletAccounts: [],
    selectedAccount: null,
    createdTokens: [],
    setPhantomWalletInstalled: v => set({ phantomWalletInstalled: v }),
    setWalletAddress: v => set({ walletAddress: v }),
    setWalletBalance: v => set({ walletBalance: v }),
    addNewWalletAccount: v => set(state => ({
        walletAccounts: [ ...state.walletAccounts, v ]
    })),
    setSelectedAccount: v => set({ selectedAccount: v }),
    addNewToken: v => set(state => ({
        createdTokens: [ ...state.createdTokens, v ]
    }))
}))

export default useStore