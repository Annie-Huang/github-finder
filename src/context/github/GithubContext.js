import { createContext, useEffect, useReducer, useState } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  /*  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    // const response = await fetch(`${GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`,
    //   },
    // });
    const response = await fetch(`${GITHUB_URL}/users`);

    const data = await response.json();
    console.log(data);
    setUsers(data);
    setLoading(false);
  };*/

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading();

    // const response = await fetch(`${GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`,
    //   },
    // });
    const response = await fetch(`${GITHUB_URL}/users`);

    const data = await response.json();
    dispatch({ type: 'GET_USERS', payload: data });
  };

  /*  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    // https://api.github.com/search/users?q=brad
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();
    dispatch({ type: 'GET_USERS', payload: items });
  };*/

  // Get single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      dispatch({ type: 'GET_USER', payload: data });
    }
  };

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    // https://api.github.com/users/bradtraversy/repos
    // https://api.github.com/users/bradtraversy/repos?sort=created&per_page=10
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );

    const data = await response.json();
    dispatch({ type: 'GET_REPOS', payload: data });
  };

  // Clear Users from state
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  // Set loading:
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        // users: state.users,
        // user: state.user,
        // repos: state.repos,
        // loading: state.loading,
        ...state,
        dispatch,
        fetchUsers,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
