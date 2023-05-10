import { useState, useEffect } from "react";

import { getQueries, createQuery } from "../../utilities/queryServices";

export default function Queries(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueries] = useState([]);
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

  useEffect(() => {
    handleRequest();
  }, []);

  const loaded = () => {
    return queries?.map((query) => {
      return (
        <div key={query._id}>
          <div>{query.submission}</div>
          <div>{query.response}</div>
          <div>{query.analysis}</div>
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
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="text"
                    value={newForm.submission}
                    name="submission"
                    placeholder="..."
                    />
                    <input
                    onChange={handleChange}
                    type="text"
                    value={newForm.response}
                    name="response"
                    placeholder="temp"
                    />
                    <input
                    onChange={handleChange}
                    type="text"
                    value={newForm.analysis}
                    name="analysis"
                    placeholder="temp"
                    />
                    <button>Send query</button>
            </form>
        </section>
    </div>
  );
}
