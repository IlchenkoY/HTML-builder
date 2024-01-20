const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        process.exit();
      }
      const fileSizeInKB = stats.size / 1024;
      console.log(
        `${file.split('.')[0]} - ${file.split('.')[1]} - ${fileSizeInKB.toFixed(
          3,
        )}kb`,
      );
    });
  });
});
