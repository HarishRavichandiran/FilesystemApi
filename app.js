const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// API endpoint to create a text file with a timestamp
app.post('/create-file', async (req, res) => {
  try {
    const tmpDir = tmp.dirSync(); // Create a temporary writable directory
    const fileName = `${new Date().toISOString().replace(/:/g, '-').slice(0, -5)}.txt`;
    const filePath = path.join(tmpDir.name, fileName);

    await fs.promises.writeFile(filePath, new Date().toString());

    // TODO: Move the file to a persistent storage solution (e.g., Amazon S3) here

    res.status(201).json({ message: 'Text file created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to retrieve all text files in a folder
app.get('/retrieve-files', async (req, res) => {
  try {
    // TODO: Implement retrieval logic based on your storage solution (e.g., Amazon S3)

    res.status(200).json({ files: ['file1.txt', 'file2.txt'] }); // Placeholder response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
