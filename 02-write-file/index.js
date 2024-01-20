const fs = require('fs');
let path = require('path');
const { stdin, stdout } = process;
const writeStream = fs.createWriteStream(
  path.join(__dirname, 'destination.txt'),
);

stdout.write('Write a text\n');
stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    exitInput();
  }
  stdout.write(
    'Сontinue entering text\nType exit or press Ctrl + C to finish session\n',
  );
  writeStream.write(data);
});

process.on('SIGINT', exitInput);
function exitInput() {
  stdout.write('Goodbye!\n');
  process.exit();
}
