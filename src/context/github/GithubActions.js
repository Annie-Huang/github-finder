const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

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
