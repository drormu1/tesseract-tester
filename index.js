const fs = require('fs');
const { exec } = require('child_process');
var sleep = require('sleep');

// Function to loop over PNG files in a directory and open them in paint
const processDir = (directoryPath) => {
    const _tesseractExe = '"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"';
    fs.readdir(directoryPath, (err, files) => {

        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {


            console.log(file);
            if (file.endsWith('.jpg')) {
                sleep.sleep(2);
                const filePath = `${directoryPath}\\${file}`;
                const fileNameWithoutExt = file.slice(0, -4); // Remove '.png' extension
                const newFileName = `${fileNameWithoutExt}_tesseract`;
                const newFilePath = `${directoryPath}\\${newFileName}`;


                exec(`${_tesseractExe} ${filePath} ${newFilePath}  -l heb txt`, (error, stdout, stderr) => {
                    console.log(filePath);
                    if (error) {
                        console.error(`Error process  ${newFilePath} in _tesserac:`, error);
                    }
                });
                exec(`${_tesseractExe} ${filePath} ${newFilePath}  -l heb pdf`, (error, stdout, stderr) => {
                    console.log(filePath);
                    if (error) {
                        console.error(`Error process  ${newFilePath} in _tesserac:`, error);
                    }
                });

                // Copy file with addition "_1" in the name
                // fs.copyFile(filePath, newPath, (err) => {
                //     if (err) {
                //         console.error(`Error copying file ${filePath} to ${newPath}:`, err);
                //     } else {
                //         console.log(`copied ${filePath} to ${newFilePath}`);
                //     }
                // });
            }
        });
    });
};

// Example usage
const directoryPath = process.argv[2]; // Get directory path from command line argument
if (!directoryPath) {
    console.error('Please provide the path to the directory.');
    process.exit(1);
}
console.log('dir is ' + directoryPath);
processDir(directoryPath);