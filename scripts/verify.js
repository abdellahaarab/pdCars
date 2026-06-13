const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

function verifyFile(filename, minLength) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.error(`❌ File missing: ${filename}`);
    process.exit(1);
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    if (!Array.isArray(data)) {
      console.error(`❌ Data in ${filename} is not an array.`);
      process.exit(1);
    }
    
    if (data.length < minLength) {
      console.error(`❌ Data count in ${filename} (${data.length}) is below required minimum (${minLength}).`);
      process.exit(1);
    }
    
    console.log(`✅ ${filename} verified: ${data.length} records found.`);
  } catch (e) {
    console.error(`❌ Failed to parse ${filename}: ${e.message}`);
    process.exit(1);
  }
}

console.log("Verifying JSON database records...");
verifyFile('brands.json', 50);
verifyFile('cars.json', 100);
verifyFile('articles.json', 100);
verifyFile('reviews.json', 500);
verifyFile('news.json', 200);

console.log("Database verification successful!");
