import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

const Home = () => {
  return (
    <>
      {/*{process.env.REACT_APP_GITHUB_TOKEN}*/}

      <UserSearch />
      <UserResults />
    </>
  );
};

export default Home;
