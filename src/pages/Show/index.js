import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuery } from "../../utilities/queryServices";

export default function Show(props) {
  const [query, setQuery] = useState(null);
  const { id } = useParams();

  const handleRequest = async () => {
    try {
      const queryData = await getQuery(id);
      setQuery(queryData);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(`Current Query: ${JSON.stringify(query)}`);

  useEffect(() => {
    handleRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loaded = () => (
    <div className='flex-column justify-center'>
        <h1><strong>Query Submission</strong></h1>
        <p className='border border-gray-400 mb-12 max-w-7xl p-2'>{query.submission}</p>
        <h1><strong>Query Response</strong></h1>
        <p className='border border-gray-400 mb-12 max-w-7xl p-2'>{query.response}</p>
        
    </div>
  )

  const loading = () => {
    return (
        <div className="query-list">
          <h1>
            Loading...
            <span>
              <img
                className="spinner"
                src="https://freesvg.org/img/1544764567.png"
                alt=""
              />{" "}
            </span>
          </h1>
        </div>
      );
  }



  return query ? loaded() : loading()
}
