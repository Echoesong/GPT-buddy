import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getQuery } from "../../utilities/queryServices"

export default function Show(props){
    const [query, setQuery] = useState(null)
    const { id } = useParams()

 const handleRequest = async () => {
		try {
				const queryData = await getQuery(id)
				setQuery(queryData)
		}catch(err){
				console.log(err)
		}
}

  console.log(`Current Query: ${JSON.stringify(query)}`)

  useEffect(() => {
    handleRequest()
  }, [])

  return <h1>Show component</h1>
}