import { useState, useEffect } from "react"

export default function Queries(props){
    const [ isLoading, setIsLoading] = useState(true)
    const [ queries, setQueries] = useState([])
    const BASE_URL = 'http://localhost:4000/queries'

    const getQueries = async () => {
        try{
            const response = await fetch(BASE_URL)
            const allQueries = await response.json()
            setQueries(allQueries)
            setIsLoading(false)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {getQueries()}, [])
    console.log(`There is/are ${queries.length} queries available to render`)

    const loaded = () => {
        return queries?.map((query) => {
            return (
                <div key={query._id}>
                    <div>{query.submission}</div>
                    <div>{query.response}</div>
                    <div>{query.analysis}</div>
                </div>
            )
        })
    }

    const loading = () => {
        <div className="query-list">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
            alt=''
          />{" "}
        </span>
      </h1>
    </div>
    }    

    return (
        <section className='query-list'>{ isLoading ? loading() : loaded() }</section>
    )
}