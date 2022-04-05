import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
    return (
        <div className='App'>
            <Header />
            <Content>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<AboutPage />} />
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
