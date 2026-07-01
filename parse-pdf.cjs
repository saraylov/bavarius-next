const fs = require('fs');
const pdf = require('pdf-parse');

const buf = fs.readFileSync('menu-temp.pdf');
pdf(buf).then(data => {
  fs.writeFileSync('menu-text.txt', data.text, 'utf8');
  console.log('Done! Text length:', data.text.length, 'Pages:', data.numpages);
}).catch(err => {
  console.error('Error:', err.message);
});
