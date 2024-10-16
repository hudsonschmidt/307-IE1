import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(user => {
        const nameMatches = name ? user["name"] === name : true;
        const jobMatches = job ? user["job"] === job : true;
        return nameMatches && jobMatches;
    });
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    let result;
    if (name || job) {
        result = findUserByNameAndJob(name, job);
        result = { users_list: result };
    } else {
        result = users;
    }

    res.send(result);
});


const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};


const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateId();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

const deleteUser = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
        const deletedUser = users["users_list"].splice(index, 1);
        return deletedUser[0];
    }
    return null;
};

app.delete("/users/:id", (req, res) => {
    const userToDelete = req.params["id"];
    let result = findUserById(userToDelete);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        deleteUser(userToDelete);
        res.status(204).send(); 
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};
