const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const folderPath = 'E:\\Filesystem'; // Replace with the actual folder path on your system

app.use(express.json());

app.post('/create_text_file', (req, res) => {
  // Generate file name with current date-time
  const fileName = `${new Date().toISOString().replace(/[-:.]/g, '')}.txt`;
  
  // Combine folder path and file name
  const filePath = path.join(folderPath, fileName);

  // Create and write timestamp to the file
  fs.writeFileSync(filePath, new Date().toISOString(), 'utf-8');

  res.json({ message: `Text file '${fileName}' created successfully!` });
});

app.get('/get_text_files', (req, res) => {
  // Get a list of all text files in the specified folder
  const textFiles = fs.readdirSync(folderPath)
    .filter(file => path.extname(file).toLowerCase() === '.txt');

  res.json({ textFiles });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
