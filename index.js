const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
// Create tree Species american arbor
const treeSpecieFs = () => {

    let rows = [];
    let unique = [];
    let headers = ["name", "markerColor"];
    const generateColor = () => {
        var letters = "0123456789ABCDEF";
        var color = '#';
        for (var i = 0; i < 6; i++)
           color += letters[(Math.floor(Math.random() * 16))];
        console.log(color);
        return color;
    }
    
    fs.createReadStream(path.resolve(__dirname,'assets', 'treeSpecieFix.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('data', row => rows.push(row))
        .on('end', () => {
            rows.forEach(row => {
                unique.push({ name: row.name, markerColor: generateColor() });
            })
            // console.log({unique})
            console.log(unique.length)
            // console.log(rows.length)
        
            csv.writeToString([headers, ...unique]).then((data) => {
                fs.appendFile('treeSpecieFinal.csv', data, function (err) {
                    if (err) throw err;
                    console.log('saved!');
                })
            })
        })
}

// Create parts csv Coolrite
const createPartsFs = () => {
	let rows = [];
	let unique = [];
	let headers = ["name","count"];
	fs.createReadStream(path.resolve(__dirname,'assets', 'parts.csv'))
	.pipe(csv.parse({ headers: true }))
	.on('data', row => rows.push(row))
	.on('end', () => {
			rows.forEach(row => {
					unique.push({ name: row.name, count: 0 });
			})
			// console.log({unique})
			console.log(unique.length)
			// console.log(rows.length)
	
			csv.writeToString([headers, ...unique]).then((data) => {
					fs.appendFile('partsFinal.csv', data, function (err) {
							if (err) throw err;
							console.log('saved!');
					})
			})
	})
};

// treeSpecieFs()
createPartsFs();