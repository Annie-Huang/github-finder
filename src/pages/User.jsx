import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import GithubContext from '../context/github/GithubContext';
import Spinner from '../components/layout/Spinner';

const User = () => {
  const { getUser, user, loading } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => getUser(params.login), []);

  if (loading) return <Spinner />;

  return <div>{user.login}</div>;
};

export default User;
