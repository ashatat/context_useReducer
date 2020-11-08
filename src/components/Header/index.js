import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { LoginsContext } from "../../App";

export default function Header() {
  const history = useHistory();
  const { state, dispatch } = useContext(LoginsContext);

  return (
    <div>
      welcome {state.name}
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {state.isLoggedIn ? (
            <button
              onClick={() => {
                dispatch({ type: "logout" });
                history.push("/login");
                window.localStorage.setItem("isLoggedIn", false);
              }}
            >
              logout
            </button>
          ) : (
            <Link to="/login">login</Link>
          )}
        </li>
      </ul>
    </div>
  );
}
