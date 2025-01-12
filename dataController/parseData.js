const fs = require('fs');
const { parse } = require('csv-parse');
const { finished } = require('stream/promises');

async function parseCsv(filePath) {
  const records = [];
  const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));

  parser.on('data', (row) => {
    records.push(row);
  });

  await finished(parser); 
  return records;
}

module.exports = parseCsv;
