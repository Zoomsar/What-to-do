import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {

    if (error.response && error.response.status === 429) {

      console.error("Too many requests: You are being rate limited.");

      res.render("index.ejs", {

        error: "Request limit reached. Please try again later.",

      });

    } else {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
}
});


app.post("/", async (req, res) => {

  try {

    console.log(req.body);

    const type = req.body.type;

    const participants = req.body.participants;



    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);

    const result = response.data;



    console.log(result);

    res.render("index.ejs", {

      data: result[Math.floor(Math.random() * result.length)],

    });

  } catch (error) {

    if (error.response && error.response.status === 429) {

      console.error("Too many requests: You are being rate limited.");

      res.render("index.ejs", {

        error: "Request limit reached. Please try again later.",

        a1: "images/bimbo.jpg",  // You may want to show this on limit reached as well.

      });

    } else {

      console.error("Failed to make request:", error.message);

      res.render("index.ejs", {

        error: error.message,

        a1: "images/bimbo.jpg",

      });

    }

  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
