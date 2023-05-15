import { useState, useEffect } from "react";
import {
  getQueries,
  createQuery,
  deleteQuery,
} from "../../utilities/queryServices";
import { Link, useNavigate } from "react-router-dom";

export default function Queries(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  //   Below I set state for a form. For my app, the only thing they will input is the text submission; response and analysis will be filled in by GPT response
  const [newForm, setNewForm] = useState({
    submission: "",
    response: "",
    analysis: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const newQuery = await createQuery(newForm);
    setNewForm({ submission: "", response: "", analysis: "" });
    handleRequest();
  };
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
    console.log("id passed to dlete func", id);
    try {
      const delResponse = await deleteQuery(id);
      console.log(delResponse);

      if (delResponse._id) {
        setRefreshData(!refreshData);
      } else {
        console.log("delResponse:", delResponse);
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      navigate(`/queries/${id}`);
    }
  };

  useEffect(() => {
    handleRequest();
  }, [refreshData]);
  
  const loaded = () => {
    if (Array.isArray(queries)) {
      return queries.map((query) => {
        return (
          <div
            key={query._id}
            className="card w-96 h-96 my-2 bg-base-100 shadow-xl rounded-lg border border-black-300 flex flex-col"
          >
            <div className="card-body px-2 overflow-y-auto max-h-48 flex-1">
              <div className="">
                <Link to={`/queries/${query._id}`}>
                  <p className="overflow-ellipsis whitespace-nowrap">
                    <strong>Submission:</strong> {query.submission}
                  </p>
                  <p className="overflow-ellipsis ">
                    <strong>Response:</strong> {query.response}
                  </p>
                </Link>
              </div>
            </div>
            <button
              className="btn w-3/5 mx-auto my-2 h-8 rounded-lg border border-gray-300 hover:bg-red-400 self-end"
              onClick={() => handleQueryDelete(query._id)}
            >
              Delete
            </button>
          </div>
        );
      });
    } else {
      console.error("Queries is not an array:", queries);
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
    <div className="border-grey-400">
      <section className="flex flex-col sm:flex-row justify-center items-center">
        <h2 className="text-center">Enter prompt here</h2>
        <form onSubmit={handleSubmit} className="">
          <input
            className="w-full sm:w-auto rounded-lg border mb-4 border-gray-300 px-4 py-2 mx-1"
            onChange={handleChange}
            type="text"
            value={newForm.submission}
            name="submission"
            placeholder="'QUESTION' or 'SUMMARY''"
          />

          <button className="btn btn-primary my-5 mx-1 px-2 rounded-lg border border-gray-300 hover:bg-green-300">
            Send query
          </button>
        </form>
      </section>
      <section className="grid grid-cols-1 justify-items-center gap-4">
        {isLoading ? loading() : loaded()}
      </section>
    </div>
  );
}
