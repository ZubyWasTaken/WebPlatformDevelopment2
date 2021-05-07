# Web Platform Development 2 Coursework
## Zubair Khalid
## S1834905
## zkhali202@caledonian.ac.uk

## Developed using Node.js and Node Express with NeDB

To install node modules
```
npm i
```

To start the node server and the website on http://localhost:3000/
```
npm index
```

###### Scope of project

To implement a web-based activity planner application to help students keep track of their weekly exercise goals as well as their achievements.

This app will allow the users to define their own training schedule per week. They can also record their achievements. These will be private and only visible to the logged in user.

Properties of weekly training plan:

- The dates of the week.
- A breakdown of the exercise goals for the week. Should be at least three fitness goals for each week. More can be added.
- The actual achievements against the goals.

Core functionality of planner:

- Training goals can be added.
- Training goals can be removed.
- Training goals can be modified
- Training goals can be defined for several weeks ahead.
- Actual training achievements can be recorded at the time they occur - can be ticked off or actual times or number of repetitions can be recorded
- Users are able to see a list of all incomplete training goals together with the week for which they were planned
- Users should be able to share a weekly plan with other users by sending a link to a week's training schedule - whoever has the link has permission to see that weeks goals and/or achievements.