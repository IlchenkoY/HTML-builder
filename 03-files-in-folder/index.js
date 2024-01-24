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

      if (stats.isFile()) {
        const fileSizeInKB = stats.size / 1024;
        const { name, ext } = path.parse(filePath);
        console.log(`${name} - ${ext.slice(1)} - ${fileSizeInKB.toFixed(3)}kb`);
      }
    });
  });
});
