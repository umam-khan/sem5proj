import React, { useEffect, useState } from "react";
import "../../src/App.css";

const PasswordManagerComponent = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);

  const maskPassword = (pass) => {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
      str += "*";
    }
    return str;
  };

  const copyText = (txt) => {
    navigator.clipboard.writeText(txt).then(
      () => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 2000);
      },
      () => {
        alert("Clipboard copying failed");
      }
    );
  };

  const deletePassword = (website) => {
    const updatedPasswords = passwords.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setPasswords(updatedPasswords);
    alert(`Successfully deleted ${website}'s password`);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(data);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPasswords = [...passwords, { website, username, password }];
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    setPasswords(newPasswords);
    alert("Password Saved");
  };

  return (
    <div>
      <div className="container">
        <h1>Password Manager</h1>
        <p>
          We're thrilled to have you here. Your digital life contains a myriad
          of passwords, and we know how challenging it can be to manage them
          all. That's why we're here to make it easy for you.
        </p>
        <h2>
          Your Passwords <span id="alert">(Copied!)</span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {passwords.length === 0 ? (
              <tr>
                <td colSpan="4">No Data To Show</td>
              </tr>
            ) : (
              passwords.map((element, index) => (
                <tr key={index}>
                  <td>
                    {element.website}{" "}
                    <img
                      onClick={() => copyText(element.website)}
                      src="../src/copy.svg"
                      alt="Copy Button"
                      width="10"
                      height="10"
                    />
                  </td>
                  <td>
                    {element.username}{" "}
                    <img
                      onClick={() => copyText(element.username)}
                      src="../src/copy.svg"
                      alt="Copy Button"
                      width="10"
                      height="10"
                    />
                  </td>
                  <td>
                    {maskPassword(element.password)}{" "}
                    <img
                      onClick={() => copyText(element.password)}
                      src="../src/copy.svg"
                      alt="Copy Button"
                      width="10"
                      height="10"
                    />
                  </td>
                  <td>
                    <button
                      className="btnsm"
                      onClick={() => deletePassword(element.website)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2>Add a Password</h2>
        <form action="/submit" method="post" onSubmit={handleFormSubmit}>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordManagerComponent;
