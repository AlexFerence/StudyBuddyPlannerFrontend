const fs = require('fs')

var content = fs.readFileSync('data.txt', 'utf8')

const arr = content.split("\n")

const data = []
counter = 0

arr.forEach((uniName) => {
    data.push({ label: uniName, id: counter})
    counter++
})

fs.writeFile('data1.txt', data, function (err) {
    if (err) throw err;
    console.log('Saved!');
});

console.log(data)

export default data