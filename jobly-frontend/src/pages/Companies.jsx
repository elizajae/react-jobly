import { useCallback, useEffect, useState } from "react";
import { JoblyApi } from "../lib/api";
import { Link } from "react-router-dom";

export const Companies = () => {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = useCallback(
    (queryOverride) => {
      JoblyApi.getCompanies(queryOverride === null ? "" : search, null, null)
        .then((companies) => {
          setCompanies(companies);
          setLoading(false);
        })
        .catch((err) => {
          alert("Error fetching companies");
          setLoading(false);
        });
    },
    [search]
  );

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchCompanies();
  };

  const onClear = () => {
    setSearch("");
    fetchCompanies(null);
  };

  return (
    <div className="companies">
      <div className="top">
        <h1>Companies</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="search">Search</label>

          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" onClick={onClear}>
            Clear
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="results">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {companies.map((company) => (
              <Link
                to={`/companies/${company.handle}`}
                key={company.handle}
                className="company"
              >
                <h2>{company.name}</h2>
                <p>{company.description}</p>
              </Link>
            ))}
            {companies.length === 0 && <h1>No companies found</h1>}
          </>
        )}
      </div>
    </div>
  );
};
