const fsPromises = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');

async function copyDir(sourceDir, destinationDir) {
  try {
    await fsPromises.mkdir(destinationDir, { recursive: true });
    const items = await fsPromises.readdir(sourceDir);

    items.forEach(async (item) => {
      const sourcePath = path.join(sourceDir, item);
      const destinationPath = path.join(destinationDir, item);
      const stats = await fsPromises.stat(sourcePath);

      if (stats.isFile()) {
        const fileContent = await fsPromises.readFile(sourcePath);
        await fsPromises.writeFile(destinationPath, fileContent);
        return;
      }
      await copyDir(sourcePath, destinationPath);
    });
  } catch (error) {
    console.error(error);
  }
}

copyDir(sourceDir, destinationDir);
