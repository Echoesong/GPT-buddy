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
  }, []);

  const loaded = () => (
    <div>
        <h1>Show Page</h1>
        <h2>{query.submission}</h2>
        <h2>{query.response}</h2>
        <h2>{query.analysis}</h2>
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
