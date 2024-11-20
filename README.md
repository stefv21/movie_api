<!DOCTYPE html>
<html lang="en">


<body>
  <header>
    <h1>Movie API</h1>
    <p>A simple API to manage users and movies with Node.js, Express, and MongoDB</p>
  </header>

  <div class="section">
    <h2>Features</h2>
    <div class="feature-list">
      <ul>
        <li><strong>User Management</strong>:
          <ul>
            <li>Create a new user</li>
            <li>Retrieve all users or a user by username</li>
            <li>Update a user's details</li>
            <li>Delete a user</li>
          </ul>
        </li>
      </ul>
      <ul>
        <li><strong>Movie Management</strong>:
          <ul>
            <li>Create a new movie</li>
            <li>Retrieve all movies or a movie by ID</li>
            <li>Update a movie's details</li>
            <li>Delete a movie</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>API Endpoints</h2>
    <h3>Users</h3>
    <ul>
      <li><strong>POST /users/create:</strong> Create a new user</li>
      <li><strong>GET /users:</strong> Get all users</li>
      <li><strong>GET /users/:Username:</strong> Get a user by username</li>
      <li><strong>PUT /users/:Username:</strong> Update a user by username</li>
      <li><strong>DELETE /users/:Username:</strong> Delete a user by username</li>
    </ul>

    <h3>Movies</h3>
    <ul>
      <li><strong>POST /movies/create:</strong> Add a new movie</li>
      <li><strong>GET /movies:</strong> Get all movies</li>
      <li><strong>GET /movies/:id:</strong> Get a movie by ID</li>
      <li><strong>PUT /movies/:id:</strong> Update a movie by ID</li>
      <li><strong>DELETE /movies/:id:</strong> Delete a movie by ID</li>
    </ul>
  </div>

  <div class="section">
    <h2>Technologies Used</h2>
    <ul class="tech-list">
      <li><strong>Node.js</strong>: JavaScript runtime environment for building server-side applications.</li>
      <li><strong>Express</strong>: Web framework for Node.js to handle routing and HTTP requests.</li>
      <li><strong>MongoDB</strong>: NoSQL database used to store user and movie data.</li>
      <li><strong>Mongoose</strong>: ODM (Object Document Mapper) for MongoDB, used to interact with the database.</li>
      <li><strong>Morgan</strong>: HTTP request logger middleware for Node.js.</li>
    </ul>
  </div>


  <footer>
    <p>Project licensed under the MIT License. See <a href="#">LICENSE</a> for details.</p>
  </footer>
</body>
</html>
