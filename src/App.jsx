import { useEffect  } from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import PhantomWalletPage from './pages/PhantomWalletPage'
import AirdropPage from './pages/AirdropPage'
import CreateTokenPage from './pages/CreateTokenPage'

import useStore from './store'
import { useWalletActions } from './services/useWalletActions'

function App() {
    const walletAddress = useStore(state => state.walletAddress)

    const { connectPhantomWallet } = useWalletActions()

    useEffect(() => { connectPhantomWallet() }, [])

    return (
        <div className='App'>
            <Header />
            <Content>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/wallet' element={<PhantomWalletPage />} />
                    {walletAddress && <>
                        <Route path='/airdrop' element={<AirdropPage />} />
                        <Route path='/create-token' element={<CreateTokenPage />} />
                    </>}
                </Routes>
            </Content>
        </div>
    )
}

const Content = styled.div`
    width: 80%;
    height: calc(100% - 80px);
    padding: 40px 10%;
`

export default App