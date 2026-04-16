const fs = require('fs');
const path = require('path');

const filesToDelete = [
  'app/chat-with-rajesh-ai/page.tsx',
  'app/(portfolio)/page.tsx'
];

filesToDelete.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${file}`);
    } catch (err) {
      console.error(`Error deleting ${file}: ${err.message}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});

// Also try to remove the empty directory
const dirToRemove = 'app/chat-with-rajesh-ai';
const fullDir = path.join(process.cwd(), dirToRemove);
if (fs.existsSync(fullDir)) {
  try {
    fs.rmdirSync(fullDir);
    console.log(`Deleted directory: ${dirToRemove}`);
  } catch (err) {
    console.error(`Error deleting directory ${dirToRemove}: ${err.message}`);
  }
}
