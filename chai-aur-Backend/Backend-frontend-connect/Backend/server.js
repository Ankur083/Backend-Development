const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is working");
});

// get a list of 5 route

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      ide:1,
      title:'A joke',
      content:'This is a joke'
    },
    {
      ide:2,
      title:'Another joke',
      content:'This is Another joke'
    },
    {
      ide:3,
      title:'Third joke',
      content:'This is Third joke'
    },
    {
      ide:4,
      title:'A Fourth joke',
      content:'This is Fourth joke'
    },
    {
      ide:5,
      title:'A Fifth joke',
      content:'This is Fifth joke'
    },
  ]
  res.send(jokes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


