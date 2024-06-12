import { useEffect, useState } from "react";
import { JoblyApi } from "../lib/api";

export const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: JoblyApi.user?.firstName ?? "",
    lastName: JoblyApi.user?.lastName ?? "",
    email: JoblyApi.user?.email ?? "",
  });

  useEffect(() => {
    if (!JoblyApi.user) {
      JoblyApi.startup(localStorage.getItem("JOBLY_TOKEN")).then(() => {
        setLoading(false);

        setFormData({
          firstName: JoblyApi.user.firstName,
          lastName: JoblyApi.user.lastName,
          email: JoblyApi.user.email,
        });
      });
    } else if (JoblyApi.user) {
      setLoading(false);
      setFormData({
        firstName: JoblyApi.user.firstName,
        lastName: JoblyApi.user.lastName,
        email: JoblyApi.user.email,
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    JoblyApi.saveProfile(formData)
      .then((user) => {
        alert("Profile saved!");
      })
      .catch((err) => {
        alert("Error saving profile");
      });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
