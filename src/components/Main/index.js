import { Routes, Route } from 'react-router-dom'
import Queries from '../../pages/Queries'
import Show from '../../pages/Show'

export default function Main(props){
    return (
        <main className='p-4'>
            <Routes>
                <Route path='/' element={<Queries/>} />
                <Route path='/queries/:id' element={<Show/>} />
            </Routes>
        </main>
    )
}