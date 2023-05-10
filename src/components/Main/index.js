import { Routes, Route } from 'react-router-dom'
import Queries from '../../pages/Queries'
import Show from '../../pages/Show'

export default function Main(props){
    return (
        <main>

            <Routes>
                <Route path='/' element={<Queries/>} />
                <Route path='/queries/:id' element={<Show/>} />
            </Routes>
        </main>
    )
}