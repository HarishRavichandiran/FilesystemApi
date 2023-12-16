const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const app = express();
const port = 3000;

const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);

app.use(bodyParser.json());

// API endpoint to create a text file with a timestamp
app.post('/create-file', async (req, res) => {
  try {
    const folderPath = 'E:\\Filesystem'; // Update with your folder path

    const currentDate = new Date();
    const fileName = `${currentDate.toISOString().replace(/:/g, '-').slice(0, -5)}.txt`;
    const filePath = path.join(folderPath, fileName);

    await writeFileAsync(filePath, currentDate.toString());

    res.status(201).json({ message: 'Text file created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to retrieve all text files in a folder
app.get('/retrieve-files', async (req, res) => {
  try {
    const folderPath = 'E://Filesystem'; // Update with your folder path

    const files = await readdirAsync(folderPath);
    const textFiles = files.filter((file) => file.endsWith('.txt'));

    res.status(200).json({ files: textFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
