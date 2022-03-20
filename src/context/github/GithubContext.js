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

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    // https://api.github.com/search/users?q=brad
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();
    dispatch({ type: 'GET_USERS', payload: items });
  };

  // Get single results
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    const data = await response.json();
    dispatch({ type: 'GET_USER', payload: data });
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
        users: state.users,
        user: state.user,
        loading: state.loading,
        fetchUsers,
        searchUsers,
        getUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
