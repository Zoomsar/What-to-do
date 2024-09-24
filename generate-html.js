import express from 'express';
import ejs from 'ejs';
import axios from 'axios';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Route to render the EJS file
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const data = response.data;
    
    // Render EJS to HTML
    const htmlString = await ejs.renderFile('index.ejs', { data });
    
    // Save the HTML string to index.html
    fs.writeFileSync('index.html', htmlString, 'utf8');
    console.log('index.html generated successfully.');
    
    // Send response to browser
    res.send(htmlString);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
