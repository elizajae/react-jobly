import { JoblyApi } from "../lib/api";

export const Home = () => {
  return (
    <div className="home">
      <h1>Jobly!</h1>
      {JoblyApi.user ? (
        <h2>Welcome back, {JoblyApi.user.firstName}!</h2>
      ) : (
        <h2>Welcome!</h2>
      )}
    </div>
  );
};
