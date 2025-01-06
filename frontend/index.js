const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    // axios.get('http://marchuk-bohdan-io-41mn-backend/api/users')
    axios.get('http://marchuk-bohdan-io-41mn-nginx/api/users')
        .then(response => {
            const { users, server } = response.data;
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Users</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background-color: #f0f8ff;
                            margin: 0;
                            padding: 20px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                        h1, h2 {
                            color: #2c3e50;
                            text-align: center;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        li {
                            background-color: #ecf0f1;
                            margin: 10px 0;
                            padding: 15px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            transition: transform 0.3s;
                        }
                        li:hover {
                            transform: scale(1.05);
                        }
                        .server-info {
                            margin-top: 20px;
                            padding: 20px;
                            background-color: #3498db;
                            color: #fff;
                            border-radius: 10px;
                            text-align: center;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            animation: fadeIn 1.5s ease-in-out;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        form {
                            margin-top: 30px;
                            background-color: #ecf0f1;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            width: 100%;
                            max-width: 400px;
                        }
                        input[type="text"] {
                            width: 100%;
                            padding: 12px;
                            margin: 10px 0;
                            border-radius: 10px;
                            border: 1px solid #bdc3c7;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        button {
                            padding: 12px 20px;
                            background-color: #2ecc71;
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: background-color 0.3s;
                        }
                        button:hover {
                            background-color: #27ae60;
                        }
                    </style>
                </head>
                <body>
                    <h1>Users</h1>
                    <ul>
                        ${users.map(user => `<li>${user.name}</li>`).join('')}
                    </ul>
                    <div class="server-info">
                        <h2>Current backend server: ${server}</h2>
                    </div>
                    <h2>Add a new user</h2>
                    <form method="POST" action="/add-user">
                        <input type="text" name="name" placeholder="Enter name" required/>
                        <button type="submit">Add User</button>
                    </form>
                </body>
                </html>
            `);
        })
        .catch(error => res.send('Error fetching users'));
});

app.post('/add-user', (req, res) => {
    const newUser = { name: req.body.name };

    axios.post('http://marchuk-bohdan-io-41mn-nginx/api/users', newUser)
        .then(response => {
            const { server } = response.data;
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Added</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background-color: #f0f8ff;
                            margin: 0;
                            padding: 20px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                        h1 {
                            color: #2c3e50;
                            text-align: center;
                        }
                        .server-info {
                            margin-top: 20px;
                            padding: 20px;
                            background-color: #3498db;
                            color: #fff;
                            border-radius: 10px;
                            text-align: center;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            animation: fadeIn 1.5s ease-in-out;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        .back-link {
                            margin-top: 20px;
                            padding: 10px 20px;
                            background-color: #2980b9;
                            color: white;
                            text-decoration: none;
                            border-radius: 10px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            transition: background-color 0.3s;
                        }
                        .back-link:hover {
                            background-color: #1abc9c;
                        }
                    </style>
                </head>
                <body>
                    <h1>User added!</h1>
                    <div class="server-info">
                        <p>New user added by backend server: ${server}</p>
                    </div>
                    <a class="back-link" href="/">Go back</a>
                </body>
                </html>
            `);
        })
        .catch(error => res.send('Error adding user'));
});

app.listen(port);



