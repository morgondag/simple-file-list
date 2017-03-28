const walker = require('./walker.js')

if(process.argv[2] && require.main === module){
	walker(process.argv[2], process.argv[3], process.argv[4]).then(result => {
		console.log(result)
	}).catch(error => {
		console.log(error)
	})
}

module.exports = (folder, filter, write) => walker(folder, filter, write);
