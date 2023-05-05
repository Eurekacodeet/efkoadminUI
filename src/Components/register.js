import React, { useState } from "react";
import axios from "axios";

const AdminRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/admins", {
        email,
        password,
      });

      //console.log(response.data);
      // Do something with the response data, such as displaying a success message
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default AdminRegistrationForm;
