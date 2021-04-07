import {createContext} from 'react';

// a simple function that by default doesn't do anything at all
function noop() {}

// the AuthContext will send parameters not through the tree-structure, but through the context. That's why in 'App.js' we gonna wrap the <Router> with the <AuthContext>
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
});
