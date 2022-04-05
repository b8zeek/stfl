import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
    return (
        <div className='App'>
            <h1 className="heading">123</h1>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
            </Routes>
        </div>
    )
}

export default App
