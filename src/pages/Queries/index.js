import { useState, useEffect } from "react";
import {
  getQueries,
  createQuery,
  deleteQuery,
} from "../../utilities/queryServices";
import { Link, useNavigate } from "react-router-dom";
import AwesomeComponent from "../../components/loadingSpinner";

export default function Queries(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    // eslint-disable-next-line no-unused-vars
    const newQuery = await createQuery(newForm);
    setNewForm({ submission: "", response: "", analysis: "" });
    handleRequest();
    setSubmitting(false);
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
          <>
            <div className="collapse bg-base-200" key={query._id}>
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                {query.submission.length > 50
                  ? `${query.submission.substring(0, 100)}...`
                  : query.submission}
              </div>

              <div className="collapse-content">
                {query.response}
                <div className="flex flex-column">
                  <button
                    className="btn btn-accent mx-1 my-1"
                    onClick={() => handleQueryDelete(query._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/queries/${query._id}`}>
                    <button className="btn btn-secondary mx-1 my-1">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
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
          <AwesomeComponent />
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
          <button className="btn btn-success">
            {submitting ? <AwesomeComponent /> : "Send query"}
          </button>
        </form>
      </section>
      <section className="grid grid-cols-1 justify-items-center gap-4">
        {isLoading ? loading() : loaded()}
      </section>
    </div>
  );
}
