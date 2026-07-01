import fs from 'fs';
import pdfjsLib from 'pdfjs-dist';

async function main() {
  const buf = fs.readFileSync('menu-temp.pdf');
  const data = new Uint8Array(buf);
  const doc = await pdfjsLib.getDocument({ data }).promise;
  let text = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    text += pageText + '\n---PAGE ' + i + '---\n';
  }
  fs.writeFileSync('menu-text.txt', text, 'utf8');
  console.log('Done! Pages:', doc.numPages, 'Text length:', text.length);
}

main().catch(err => console.error('Error:', err));
