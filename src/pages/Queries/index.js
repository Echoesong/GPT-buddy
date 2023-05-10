import { useState, useEffect } from "react"

import { getQueries } from "../../services/queryServices"

export default function Queries(props){
    const [ isLoading, setIsLoading] = useState(true)
    const [ queries, setQueries] = useState([])

    async function handleRequest(){
        try{
            const queriesData = await getQueries()
            setQueries(queriesData)
            setIsLoading(false)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {handleRequest()}, [])
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

        return (
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
        )
    }    

    return (
        <section className='query-list'>{ isLoading ? loading() : loaded() }</section>
    )
}