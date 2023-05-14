import { useState, useEffect } from "react";
import { getQueries, createQuery, deleteQuery } from "../../utilities/queryServices";
import { Link, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

export default function Queries(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [refreshData, setRefreshData] = useState(false)
  const navigate = useNavigate();
  
//   Below I set state for a form. For my app, the only thing they will input is the text submission; response and analysis will be filled in by GPT response
  const [newForm, setNewForm] = useState({
    submission: '',
    response: '',
    analysis: ''
  })
  const handleChange = (e) => {
    e.preventDefault()
    setNewForm({...newForm, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-unused-vars
    const newQuery = await createQuery(newForm)
    setNewForm({submission: '', response: '', analysis: '' })
    handleRequest()
  }
  const { getAccessTokenSilently } = useAuth0()
  async function handleRequest() {
    try {
      const token = await getAccessTokenSilently()
      const queriesData = await getQueries(token);
      setQueries(queriesData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleQueryDelete = async (id) => {
    console.log('id passed to dlete func', id)
    try{
      const delResponse = await deleteQuery(id)
      console.log(delResponse)

      if(delResponse._id){
        setRefreshData(!refreshData)
      } else{
        console.log('delResponse:', delResponse)
        throw new Error('Something went wrong')
      }
    } catch(err){
      console.log(err)
      navigate(`/queries/${id}`)
    }

  }

  useEffect(() => {
    handleRequest();
  }, [refreshData]);
  console.log("all shown queries", queries)
  const loaded = () => {
    if (Array.isArray(queries)){
      return queries.map((query) => {
        return (
          <div key={query._id}
          className='card w-96 bg-base-100 shadow-xl'
          >
            <div className='card-body'>
              <div className=''>
                <Link to={`/queries/${query._id}`}> 
                  <p>{query.submission}</p>
                  <p>{query.response}</p>
                </Link>
              </div>
            </div>
            <button className='btn btn-danger' onClick={() => handleQueryDelete(query._id)}>Delete</button>
          </div>
        );
      });

    } else {
      console.error('Queries is not an array:', queries);
      return null;
    }
  };

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
  };

  return (
    <div className="index-page">
        
        <section>
            <h2>Enter prompt here</h2>
            <form onSubmit={handleSubmit} >
                <input
                    className='input input-bordered input-primary w-full m-1 max-w-xs'
                    onChange={handleChange}
                    type="text"
                    value={newForm.submission}
                    name="submission"
                    placeholder="..."
                    />
                    <button
                    className='btn btn-primary my-5 m-1'
                    >Send query</button>
            </form>
        </section>
        <section className="query-list">{isLoading ? loading() : loaded()}</section>
    </div>
  );
}
