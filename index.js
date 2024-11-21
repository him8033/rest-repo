const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const posts = [
    {
        id: uuidv4(),
        username: "john",
        content: "john is the good person",
    },
    {
        id: uuidv4(),
        username: "bob",
        content: "he is best coder",
    },
    {
        id: uuidv4(),
        username: "Ewe",
        content: "Frontend Developer",
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", { post });
})

app.listen(port, () => {
    console.log("listing to port", port);
})