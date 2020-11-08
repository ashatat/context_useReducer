import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { LoginsContext } from "../../App";

export default function Login() {
  const history = useHistory();
  console.log(history);
  const [username, setUsername] = useState("");
  const { dispatch } = useContext(LoginsContext);

  const parseText = (txt) => txt.toUpperCase();

  return (
    <div>
      Login page
      <input
        type="text"
        value={parseText(username)}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={() => {
          history.push("/");
          dispatch({ type: "login", payload: "ahmed" });
        }}
      >
        Login
      </button>
    </div>
  );
}
