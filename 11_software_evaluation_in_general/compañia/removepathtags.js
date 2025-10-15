const fs = require('fs');
const path = require('path');

// Directory where the files are located
const folderPath = '/.';

// Read all files in the directory
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading the directory:', err);
        return;
    }

    // Filter the files that end with .html
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(folderPath, file);

        // Read the file content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading the file ${file}:`, err);
                return;
            }

            // Remove <svg> and </svg> tags and their content
            const updatedContent = data.replace(/<svg[^>]*>[\s\S]*?<\/svg>/g, '');

            // Overwrite the file with the updated content
            fs.writeFile(filePath, updatedContent, 'utf8', err => {
                if (err) {
                    console.error(`Error writing the file ${file}:`, err);
                } else {
                    console.log(`Processed and updated: ${file}`);
                }
            });
        });
    });
});
