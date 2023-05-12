import { useState, useEffect } from "react";
import { getQueries, createQuery, deleteQuery } from "../../utilities/queryServices";
import { Link, useNavigate } from "react-router-dom"

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

  async function handleRequest() {
    try {
      const queriesData = await getQueries();
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
    return queries?.map((query) => {
      return (
        <div key={query._id}
        className='border-radius-1 ring-2 ring-black'
        >
          <Link to={`/queries/${query._id}`}>
            <div>{query.submission}</div>
            <div>{query.response}</div>
            <div>{query.analysis}</div>
          </Link>
          <button onClick={() => handleQueryDelete(query._id)}>Delete</button>
        </div>
      );
    });
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
        <section className="query-list">{isLoading ? loading() : loaded()}</section>
        <section>
            <h2>Enter prompt here</h2>
            <form onSubmit={handleSubmit} >
                <input
                    className='ring-2 ring-black m-1'
                    onChange={handleChange}
                    type="text"
                    value={newForm.submission}
                    name="submission"
                    placeholder="..."
                    />
                    <input
                    className='ring-2 ring-black m-1'
                    onChange={handleChange}
                    type="text"
                    value={newForm.response}
                    name="response"
                    placeholder="temp"
                    />
                    <input
                    className='ring-2 ring-black m-1'
                    onChange={handleChange}
                    type="text"
                    value={newForm.analysis}
                    name="analysis"
                    placeholder="temp"
                    />
                    <button
                    className='rounded-full ring-2 ring-black m-1'
                    >Send query</button>
            </form>
        </section>
    </div>
  );
}
