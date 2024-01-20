const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const copyfFolderPath = path.join(__dirname, 'files-copy');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  fs.access(copyfFolderPath, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
        if (err) {
          console.error(err);
          process.exit();
        }
      });

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const destPath = path.join(__dirname, 'files-copy', file);
        fs.copyFile(filePath, destPath, (err) => {
          if (err) {
            console.error(err);
            process.exit();
          }
        });
      });
    } else {
      console.log('Files are already copied');
      process.exit();
    }
  });
});
