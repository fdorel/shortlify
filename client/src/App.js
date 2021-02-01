import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';

function App() {
  // we gonna send all the below parameters throgh the app with the 'Context' 
  const {token, login, logout, userId, ready} = useAuth()
  // the 'isAuthenticated' flag tells us wether the user is authenticated in the system or not
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  // if ready is false, that is if we didn't decided the authorization we will return the component <Loader/> 
  if (!ready) {
    return <Loader/>
  }

  return (

    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
    <Router>
      {/* if the user is authenticated, then we are showing the navbar */}
      { isAuthenticated && <Navbar/> }
      <div className="container">
        {routes}
      </div>
    </Router> 
    </AuthContext.Provider>
  );
}

export default App;
