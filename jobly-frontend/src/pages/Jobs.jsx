import { useCallback, useEffect, useState } from "react";
import { JoblyApi } from "../lib/api";

export const Jobs = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userRefreshOverride, setUserRefreshOverride] = useState([]);

  const fetchJobs = useCallback(
    (queryOverride) => {
      JoblyApi.getJobs(queryOverride === null ? "" : search, null, null)
        .then((jobs) => {
          setJobs(jobs);
          setLoading(false);
        })
        .catch((err) => {
          alert("Error fetching jobs");
          setLoading(false);
        });
    },
    [search]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const onClear = () => {
    setSearch("");
    fetchJobs(null);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyForJob = (jobId) => {
    JoblyApi.applyForJob(jobId, JoblyApi.user.username)
      .then((message) => {
        setUserRefreshOverride((prev) => [...prev, jobId]);
        alert("Applied for job!");
      })
      .catch((err) => {
        if (err[0].includes("duplicate key")) {
          alert("You've already applied for this job!");
        } else {
          alert("Error applying for job.");
        }
      });
  };

  if (!JoblyApi.user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="jobs-page">
      <div className="top">
        <h1>Jobs</h1>
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
            {jobs.map((job) => (
              <div key={job.id} className="job">
                <h3>{job.title}</h3>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
                {JoblyApi.user && JoblyApi.user.applications && (
                  <button
                    onClick={() => applyForJob(job.id)}
                    disabled={
                      JoblyApi.user.applications.includes(job.id) ||
                      userRefreshOverride.includes(job.id)
                    }
                  >
                    {JoblyApi.user.applications.includes(job.id) ||
                    userRefreshOverride.includes(job.id)
                      ? "Applied"
                      : "Apply"}
                  </button>
                )}
              </div>
            ))}
            {jobs.length === 0 && <h1>No jobs found</h1>}
          </>
        )}
      </div>
    </div>
  );
};
