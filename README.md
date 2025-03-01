Project: myFlix React App

Welcome to myFlix—a dynamic, single-page movie application built using React that connects to an existing REST API and database. This project demonstrates full-stack JavaScript development with the MERN (MongoDB, Express, React, Node.js) stack.

## Overview

**Objective:**  
Build the client-side for myFlix using React, creating a smooth and interactive interface that communicates with the pre-built server-side.

**Context:**  
In the past, web pages were rendered server-side, which could lead to slower and less engaging user experiences. With modern browsers and React, client-side applications now deliver a faster and more responsive experience. This project upgrades myFlix by adding an intuitive UI for movie browsing, detailed views, and personalized profiles.

## The 5 Ws

- **Who:**  
  Movie enthusiasts who enjoy exploring detailed information about films.

- **What:**  
  A responsive, single-page application featuring multiple views (Main, Single Movie, Login, Signup, Profile) with rich interactions.

- **When:**  
  Available anytime for users to discover and manage movie information and their favorites.

- **Where:**  
  Hosted online, ensuring a consistent experience across all devices.

- **Why:**  
  To give movie fans an engaging way to access movie details and keep track of their favorite films.

## Design Criteria

### User Stories
- **Movie Information:**  
  Users can access details about movies they’re interested in.
- **Profile Creation:**  
  Users can register and manage profiles to save their favorite movies.

### Essential Features

- **Main View:**
  - Displays all movies with images, titles, and descriptions.
  - Includes a search feature to filter the movie list.
  - Enables users to select a movie for more details.
  - Offers logout and navigation to the Profile view.

- **Single Movie View:**
  - Shows detailed information about a selected movie (description, genre, director, image).
  - Allows users to add movies to their list of favorites.

- **Authentication Views:**
  - **Login:** Users can sign in with a username and password.
  - **Signup:** New users can register with a username, password, email, and date of birth.

- **Profile View:**
  - Displays user details and favorite movies.
  - Allows users to update their information or deregister.

### Addtional Features

- **Actors, Genre, and Director Views:**  
  Provide additional details like actor bios, genre descriptions, or director information.
- **Enhanced Single Movie View:**  
  Options such as tooltips for extra info, sharing features, or displaying related movies.
- **Sorting & “To Watch” List:**  
  Allow users to sort movies and create custom lists.


## Technical Requirements

- **Single-Page Application (SPA):**  
  Built using React and React Router for smooth navigation.
- **Build Tool:**  
  Uses Parcel for bundling.
- **Modern JavaScript:**  
  Written in ES2015+ with function components.
- **Styling:**  
  Bootstrap is used for a responsive, modern look.
- **State Management:**  
  React Redux may be used for features like movie filtering.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Code Examples](#code-examples)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/myFlix-react-app.git
    cd myFlix-react-app
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure Environment Variables:**
    Create a `.env` file in the root directory with any necessary configuration (e.g., API URL):
    ```env
    REACT_APP_API_URL=https://your-movie-api.com
    ```

4. **Run the Application:**
    ```bash
    npm start
    ```
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Navigation:**  
  Use the navigation bar to access different views (Main, Movie Details, Profile, etc.).
- **Search:**  
  Filter movies using the built-in search functionality.
- **Interactions:**  
  Click on movies to see details and add them to your favorites.
- **User Management:**  
  Register, log in, update your profile, or deregister as needed.

## Code Examples

### App.js

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainView from './components/MainView';
import MovieView from './components/MovieView';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
import ProfileView from './components/ProfileView';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/movies/:id" element={<MovieView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
