# Polling-API

A simple API allowing you to create questions, add options to questions, add vote to options, delete question and options

# How to Use

1. Install NodeJs (nodejs.org).
2. Fork, Clone and open this repository in a terminal/command prompt.
3. Execute npm install.
4. Execute npm start.
5. Test the API with API ROOT as -> https://localhost:8000.

# Routes

1. /questions/all_questions (to get the list of all the already created questions along with options)
2. /questions/create (To create a question)
3. /questions/:id/options/create (To add options to a specific question)
4. /questions/:id/delete (To delete a question)
5. /options/:id/delete (To delete an option)
6. /options/:id/add_vote (To increment the count of votes)
7. /questions/:id (To view a question and it’s options)

NOTE : you can get the question's id to be passed in respective route from the data you get when you hit "https://localhost:8000/questions/all_questions" route
