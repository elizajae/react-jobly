import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  static user;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async startup(token) {
    if (token) {
      JoblyApi.token = token;
      const username = jwtDecode(token).username;

      let res = await this.request(`users/${username}`);
      JoblyApi.user = res.user;
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(searchTerm, minEmployees, maxEmployees) {
    const opts = {
      name: searchTerm,
      minEmployees,
      maxEmployees,
    };

    if (!searchTerm) delete opts.name;

    if (!minEmployees) delete opts.minEmployees;

    if (!maxEmployees) delete opts.maxEmployees;

    let res = await this.request(`companies`, opts);
    return res.companies;
  }

  static async getJobs(searchTerm, minSalary, hasEquity) {
    const opts = {
      title: searchTerm,
      minSalary,
      hasEquity,
    };

    if (!searchTerm) delete opts.title;

    if (!minSalary) delete opts.minSalary;

    if (!hasEquity) delete opts.hasEquity;

    let res = await this.request(`jobs`, opts);
    return res.jobs;
  }

  static async saveProfile(data) {
    let res = await this.request(
      `users/${JoblyApi.user.username}`,
      data,
      "patch"
    );
    return res.user;
  }

  static async applyForJob(jobId, username) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.message;
  }

  static async login(username, password) {
    let res = await this.request(`auth/token`, { username, password }, "post");
    JoblyApi.token = res.token;

    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    JoblyApi.token = res.token;

    return res.token;
  }
}
