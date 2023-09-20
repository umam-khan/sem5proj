import React from "react";

const PasswordManager = () => {
  return (
    <div>
      <nav>
        <div className="logo">PassX</div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
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
          <tbody></tbody>
        </table>

        <h2>Add a Password</h2>
        <form action="/submit" method="post">
          {/* Text input for website */}
          <label htmlFor="website">Website:</label>
          <input type="text" id="website" name="website" required />
          <br />
          <br />
          {/* Text input for username */}
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <br />
          <br />
          {/* Password input */}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          {/* Submit button */}
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordManager;
