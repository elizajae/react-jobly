import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JoblyApi } from "../lib/api";

export const Company = () => {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [userRefreshOverride, setUserRefreshOverride] = useState([]);

  const fetchCompany = useCallback(() => {
    JoblyApi.getCompany(handle)
      .then((company) => {
        setCompany(company);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error fetching company");
        navigate("/companies");
        setLoading(false);
      });
  }, [handle, navigate]);

  useEffect(() => {
    fetchCompany();
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

  return (
    <div className="company-page">
      {!loading && company && (
        <>
          <h1>{company.name}</h1>
          <p>{company.description}</p>
          <hr />
          <h2>Jobs</h2>
          <div className="results">
            {company.jobs.map((job) => (
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
          </div>
        </>
      )}
    </div>
  );
};
