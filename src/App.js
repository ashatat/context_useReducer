import { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";

const initState = {
  isLoggedIn: false,
  name: "",
  error: "",
};

function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("name", action.payload);

      return {
        isLoggedIn: true,
        isLoading: false,
        name: action.payload,
        error: "",
      };
    case "logout":
      window.localStorage.setItem("isLoggedIn", false);
      window.localStorage.setItem("name", "...");

      return { isLoggedIn: false, name: "", error: "", isLoading: false };
    case "error":
      return { ...state, error: action.error };
    case "loading":
      return { ...state, isLoading: true };

    default:
      throw new Error("Invalid action type");
  }
}

export const LoginsContext = createContext({
  state: initState,
  dispatch: null,
});

function App() {
  // const [hobbies, setHobbies] = useState([]);
  const [state, dispatch] = useReducer(loginReducer, initState);
  // const [providerState, setProvider] = useState({});

  // useEffect(() => {
  //   setProvider({ state, dispatch });
  // }, [setProvider, state]);

  useEffect(() => {
    setTimeout(() => {
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      const name = window.localStorage.getItem("name");

      if (isLoggedIn) {
        dispatch({ type: "login", payload: name });
      } else {
        dispatch({ type: "logout" });
      }
    }, 200);
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginsContext.Provider value={{ state, dispatch }}>
            {/* <LoginsContext.Provider value={providerState}> */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </LoginsContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
