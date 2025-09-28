const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let students = [
  {
    id: 1,
    name: 'Jessica Drake',
    classes: {
      biology: 95,
      algebra: 92
    }
  },
  {
    id: 2,
    name: 'Ben Cohen',
    classes: {
      biology: 95,
      algebra: 92
    }
  },
  {
    id: 3,
    name: 'Lisa Downing',
    classes: {
      biology: 95,
      algebra: 92
    }
  }
];

// Gets the list of data about ALL students

app.get('/students', (req, res) => {
  res.json(students);
});
// Gets the data about a single student, by name

app.get('/students/:name', (req, res) => {
  res.json(students.find((student) =>
    { return student.name === req.params.name }));
});

// Adds data for a new student to our list of students.
app.post('/students', (req, res) => {
  // Basic CSRF protection - check origin
  const origin = req.get('Origin') || req.get('Referer');
  const allowedOrigins = ['http://localhost:3000', 'https://myflixapp-0225.netlify.app', 'https://stefv21.github.io'];
  
  if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return res.status(403).json({ message: 'Forbidden origin' });
  }
  
  let newStudent = req.body;

  if (!newStudent.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newStudent.id = uuid.v4();
    students.push(newStudent);
    res.status(201).send(newStudent);
  }
});

// Deletes a student from our list by ID
app.delete('/students/:id', (req, res) => {
  let student = students.find((student) => { return student.id === req.params.id });

  if (student) {
    students = students.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).json({ message: 'Student deleted', id: req.params.id });
  }
});

// Update the "grade" of a student by student name/class name
app.put('/students/:name/:class/:grade', (req, res) => {
  let student = students.find((student) => { return student.name === req.params.name });

  if (student) {
    student.classes[req.params.class] = parseInt(req.params.grade);
    res.status(201).json({ message: 'Grade assigned', name: req.params.name, class: req.params.class, grade: req.params.grade });
  } else {
    res.status(404).json({ error: 'Student not found', name: req.params.name });
  }
});

// Gets the GPA of a student
app.get('/students/:name/gpa', (req, res) => {
  let student = students.find((student) => { return student.name === req.params.name });

  if (student) {
    let classesGrades = Object.values(student.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
    let sumOfGrades = 0;
    classesGrades.forEach(grade => {
      sumOfGrades = sumOfGrades + grade;
    });

    let gpa = sumOfGrades / classesGrades.length;
    console.log(sumOfGrades);
    console.log(classesGrades.length);
    console.log(gpa);
    res.status(201).send('' + gpa);
    //res.status(201).send(gpa);
  } else {
    res.status(404).json({ error: 'Student not found', name: req.params.name });
  }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});