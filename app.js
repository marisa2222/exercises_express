const express = require("express");

//Exercise 10
const axios = require("axios");

//Exercise 6
const methodOverride = require("method-override");

//Exercise 11
const fs = require("fs");

const path = require("path");

const app = express();

//Exercise 6
app.use(methodOverride("X-HTTP-Method-Override")); //middelware

// set the view engine to ejs
app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Server is up and listens to 3000");
});

//Exercise 1
app.get("/", function (req, res) {
  res.send("Hello World!");
});

//Exercise 2
app.put("/", function (req, res) {
  const options = {
    root: path.join(__dirname),
  };
  res.sendFile("index.html", options);
});

//Exercise 3
app.delete("/", function (req, res) {
  res.json({ good: "yep" });
});

//Exercise 4
app.get("/test-ejs", function (req, res) {
  res.render("test1", {
    myTitle: "my first title",
  });
});

//Exercise 5
app.get("/test-ejs2", function (req, res) {
  const data = {
    users: ["Bob", "John", "Jane"],
  };
  res.render("test2", data);
});

//Exercise 7
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/ex-7", function (req, res) {
  const options = {
    root: path.join(__dirname),
  };
  res.sendFile("ex-7.html", options);
});

app.post("/showPost", function (req, res) {
  console.log("First name:", req.body.fname);
  console.log("Last name:", req.body.lname);

  res.end();
});

//Exercise 8

app.get("/ex-8", function (req, res) {
  const options = {
    root: path.join(__dirname),
  };
  res.sendFile("ex-8.html", options);
});

app.get("/showGet", function (req, res) {
  console.log("First name:", req.query.fname);
  console.log("Last name:", req.query.lname);

  res.end();
});

//Exercise 9

app.get("/number/:id", function (req, res) {
  res.send("The number is " + req.params.id);
});


//Exercise  10, 11
app.get("/postlist", function (req, res) {
  axios
    .get("http://jsonplaceholder.typicode.com/posts/1")
    .then(function (response) {
      const jsonString = JSON.stringify(response.data)
      fs.writeFile("./posts.json",jsonString , function (err) {
        if (err) {
          res.send("Error writing file", err);
        } else {
          res.send("Successfully wrote file");
        }
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// Exercise  12
// pm2 start app.js 
// pm2 list    

// Exercise  13
// pm2 start app.js -i 1 -f  

// Exercise  14
// pm2 start app.js --watch 

// Exercise  15
// pm2 logs