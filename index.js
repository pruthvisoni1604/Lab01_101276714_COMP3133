const csv = require('csv-parser');
const fs = require('fs');

fs.unlink('Canada.txt', function (err) {
    if (err){
        console.log(err)
        return
    }
    console.log('File deleted!');
  });
fs.unlink('United States.txt', function (err) {
    if (err){
        console.log(err)
        return
    }
    console.log('File deleted!');
  });

function getFilteredData(y, callback){ 
    const result = [];                 
    fs.createReadStream('input_countries.csv')
      .pipe(csv())
      .on('data', (row) => {
          const headers = Object.keys(row);
          if(row[headers[0]] == y )
              result.push(row)
       })
      .on('end', () => {
          console.log(result)
          callback(result,y)
          console.log('Filtered data successfully copied!');
       });
}

function putFilteredData(result,y){
    var writeStream =fs.createWriteStream(y+'.txt')
    result.map(i => {
        writeStream.write(JSON.stringify(i)+"\n")
     });
}

getFilteredData("Canada",putFilteredData)
getFilteredData("United States",putFilteredData)
