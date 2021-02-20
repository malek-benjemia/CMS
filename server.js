const express = require('express');
const con = require('./db/database.js');
const Questions= require('./src/Questions.js');


const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server 
con.on('connect', () => {
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      //initial function
      new Questions().initializeQuestions();
  });
});


