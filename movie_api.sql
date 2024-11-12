CREATE TABLE if NOT EXISTS Genres (
  GenreID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Description varchar(1000)
);
CREATE TABLE IF NOT EXISTS Directors (
  DirectorID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Bio varchar(1000),
  Birthyear date,
  Deathyear date
);

CREATE TABLE if NOT EXISTS Users (
  UserID serial PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  Email varchar(50) NOT NULL,
  Birth_date date
);


CREATE TABLE if NOT EXISTS Movies (
  MovieID serial PRIMARY KEY,
  Title varchar (50) NOT NULL,
  Description varchar (1000),
  DirectorID integer NOT NULL,
  GenreID integer NOT NULL,
  ImageURL varchar (300),
  Featured boolean,
  CONSTRAINT GenreKey FOREIGN KEY (GenreID)
    REFERENCES Genres (GenreID),
  CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
    REFERENCES Directors(DirectorID)
);

CREATE TABLE Users_Movies (
  UserID INTEGER REFERENCES Users(UserID) ON DELETE CASCADE,
  MovieID INTEGER REFERENCES Movies(MovieID) ON DELETE CASCADE,
  PRIMARY KEY (UserID, MovieID)
);


-- Insert data into Genres table
INSERT INTO Genres (Name, Description) VALUES
('Action', 'Fast-paced movies with intense sequences of physical action.'),
('Romance', 'Movies centered around love and romantic relationships.'),
('Fantasy', 'Movies involving magical or supernatural elements.');

-- Insert data into Directors table
INSERT INTO Directors (Name, Bio, Birthyear, Deathyear) VALUES
('Tony Scott', 'Tony Scott was a British film director, producer, and screenwriter, known for his action films.', '1944-06-21', '2012-08-19'),
('Ron Clements', 'Ron Clements is an American animator, film director, and screenwriter known for his work on Disney classics.', '1953-04-25', NULL),
('James Cameron', 'James Cameron is a Canadian filmmaker known for directing high-grossing films like Titanic and Avatar.', '1954-08-16', NULL);

-- Insert data into Users table
INSERT INTO Users (Username, Password, Email, Birth_date) VALUES
('user1', 'password1', 'user1@example.com', '1990-01-01'),
('user2', 'password2', 'user2@example.com', '1985-05-15'),
('user3', 'password3', 'user3@example.com', '1995-08-30');

-- Insert data into Movies table
INSERT INTO Movies (Title, Description, DirectorID, GenreID, ImageURL, Featured) VALUES
('Top Gun', 'A modern action movie about elite naval aviators.', (SELECT DirectorID FROM Directors WHERE Name = 'Tony Scott'), (SELECT GenreID FROM Genres WHERE Name = 'Action'), 'http://example.com/topgun.jpg', TRUE),
('The Little Mermaids', 'A Disney animated classic about a young mermaid\ adventures.', (SELECT DirectorID FROM Directors WHERE Name = 'Ron Clements'), (SELECT GenreID FROM Genres WHERE Name = 'Fantasy'), 'http://example.com/littlemermaid.jpg', FALSE),
('Barbie (2024)', 'A live-action adaptation that explores Barbie\ world and adventures.', (SELECT DirectorID FROM Directors WHERE Name = 'Greta Gerwig'), (SELECT GenreID FROM Genres WHERE Name = 'Fantasy'), 'http://example.com/barbie2024.jpg', TRUE),
('Twisters', 'A thrilling movie about storm chasers facing nature\ wrath.', (SELECT DirectorID FROM Directors WHERE Name = 'Jan de Bont'), (SELECT GenreID FROM Genres WHERE Name = 'Action'), 'http://example.com/twisters.jpg', TRUE),
('The Notebook', 'A romantic drama about a love story that transcends time.', (SELECT DirectorID FROM Directors WHERE Name = 'Nick Cassavetes'), (SELECT GenreID FROM Genres WHERE Name = 'Romance'), 'http://example.com/notebook.jpg', TRUE),
('Titanic', 'A historical romance set against the tragic sinking of the Titanic.', (SELECT DirectorID FROM Directors WHERE Name = 'James Cameron'), (SELECT GenreID FROM Genres WHERE Name = 'Romance'), 'http://example.com/titanic.jpg', TRUE),
('Pretty Woman', 'A romantic comedy about a chance encounter that changes two lives.', (SELECT DirectorID FROM Directors WHERE Name = 'Garry Marshall'), (SELECT GenreID FROM Genres WHERE Name = 'Romance'), 'http://example.com/prettywoman.jpg', FALSE),
('How to Lose a Guy in 10 Days', 'A humorous tale about a woman writing an article on dating gone wrong.', (SELECT DirectorID FROM Directors WHERE Name = 'Donald Petrie'), (SELECT GenreID FROM Genres WHERE Name = 'Romance'), 'http://example.com/lovehowto.jpg', FALSE),
('Aladdin', 'A young man discovers a magical lamp and embarks on an adventure to win the heart of Princess Jasmine.', (SELECT DirectorID FROM Directors WHERE Name = 'Ron Clements'), (SELECT GenreID FROM Genres WHERE Name = 'Fantasy'), 'http://example.com/aladdin.jpg', TRUE),
('The Wedding Planner', 'A romantic comedy about a wedding planner who finds herself falling for the groom.', (SELECT DirectorID FROM Directors WHERE Name = 'Adam Shankman'), (SELECT GenreID FROM Genres WHERE Name = 'Romance'), 'http://example.com/weddingplanner.jpg', TRUE);

-- Insert data into Users_Movies table (user-movie pairs)
INSERT INTO "Users_Movies" (UserID, MovieID) VALUES
((SELECT UserID FROM Users WHERE Username = 'user1'), (SELECT MovieID FROM Movies WHERE Title = 'Top Gun')),
((SELECT UserID FROM Users WHERE Username = 'user1'), (SELECT MovieID FROM Movies WHERE Title = 'Titanic')),
((SELECT UserID FROM Users WHERE Username = 'user2'), (SELECT MovieID FROM Movies WHERE Title = 'The Notebook')),
((SELECT UserID FROM Users WHERE Username = 'user3'), (SELECT MovieID FROM Movies WHERE Title = 'How to Lose a Guy in 10 Days')),
((SELECT UserID FROM Users WHERE Username = 'user3'), (SELECT MovieID FROM Movies WHERE Title = 'Aladdin'));



SELECT GenreID
FROM Genres
WHERE Name = 'Romance'; 


SELECT *
FROM Movies
WHERE GenreID = (SELECT GenreID FROM Genres WHERE Name = 'Romance'); 



UPDATE Users
SET Email = 'newemail@example.com'  
WHERE Username = 'user1';  



DELETE FROM Movies
WHERE Title = 'The Wedding Planner';  



SELECT DirectorID, COUNT(*) as MovieCount
FROM Movies
GROUP BY DirectorID
HAVING COUNT(*) >= 2;


SELECT GenreID, COUNT(*) as MovieCount
FROM Movies
GROUP BY GenreID
HAVING COUNT(*) >= 2;
