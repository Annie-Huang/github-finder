const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search results
export const searchUsers = async (text) => {
  // setLoading();

  const params = new URLSearchParams({
    q: text,
  });

  // https://api.github.com/search/users?q=brad
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

  const { items } = await response.json();
  // dispatch({ type: 'GET_USERS', payload: items });
  return items;
};

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
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);

  const data = await response.json();
  dispatch({ type: 'GET_REPOS', payload: data });
};
