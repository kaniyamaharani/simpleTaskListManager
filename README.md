# tasksManagerProgram
A Program to Manage Tasks
steps on how to run this program:
- Open the terminal, make sure it leads to the correct directory
- Type 'node index.js'
- Wait until it says 'Server started on port 4000' on the terminal
Note: the port used in this program is port 4000

How to use the program:
- To test the API of the program about managing a task, go to Postman app
- Use a tool like Postman or cURL to send HTTP requests to the server and interact with the API. Here are the functions that the program provided to be tested.
- Create a new task:
Method: POST
URL: http://localhost:4000/api/tasks
Body: { "title": "Write some code", "dueDate": "31/07/2023" }
Output: { "title": "Write some code", "dueDate": "31/07/2023" }

- Update a task:
Method: PUT
URL: http://localhost:4000/api/tasks/{:Id} (replace {:Id} with the ID of the task you want to update)
Body: { "title": "Updated task title" }
Output: { "title": "Updated task title", "dueDate": "31/07/2023" }

- Delete a task:
Method: DELETE
URL: http://localhost:4000/api/tasks/{:Id} (replace {:Id} with the ID of the task you want to delete)
Output: { "title": "Deleted task title", "dueDate": "31/07/2023" }

- Retrieve all tasks:
Method: GET
URL: http://localhost:4000/api/tasks
Output: [ { "title": "Task 1", "dueDate": "31/07/2023" }, { "title": "Task 2", "dueDate": "1/08/2023" } ]

- Retrieve tasks expiring today:
Method: GET
URL: http://localhost:4000/api/tasks/expiring-today
Output: [ { "title": "Task 1", "dueDate": "23/05/2023" } ]

- Mark a task as done:
Method: PATCH
URL: http://localhost:4000/api/tasks/{:Id}/done (replace {:Id} with the ID of the task you want to mark as done)
Output: { "title": "Task marked as done", "dueDate": "23/05/2023" }

How to end the program:
- To stop running the program, go to the terminal and press CTRL+C
