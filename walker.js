'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (path, filter, writefile) => new Promise((resolve, reject) => {
	let startTime = Date.now()

	checkDirectory(path)
		.then((data) => saveFile(data, writefile))
		.then(filelist => resolve ({
			directory: path,
			filter: filter,
			files: filterFiles(filelist, filter),
			time: Date.now() - startTime + ' ms'
		}))
		.catch(errors => reject(errors))
})

const saveFile = (filelist,writefile) => new Promise((resolve, reject) => {
	if(writefile){
		fs.writeFile(writefile, JSON.stringify(filelist), 'utf-8', (error) => {
			if(error){
				reject(error)
			}
			resolve(filelist);
		})
	}
	resolve(filelist);
})

const checkDirectory = directory => new Promise((resolve, reject) => {
	fs.readdir(directory, (error, list) => {
		if (error) {
			reject(error)
			return
		}

		if (list.length <= 0) {
			resolve(directory + '/' + list)
			return
		}

		Promise.all(
			list.map((item) => {
				return stats(directory + '/' + item)
			})
		).then(result => resolve( [].concat.apply([], result) ) )
		.catch(filerror => reject(filerror))
	})
})

const stats = file => new Promise( resolve => {
	fs.stat(file, (err, filestatus) => {
		if (filestatus && filestatus.isDirectory()) {
			checkDirectory(file)
				.then(data => resolve(data))
				.catch(error => reject(error))
		} else {
			resolve(file)
		}
	})
})

const filterFiles = (filelist, filetype) => {
	if(!filetype || filetype === "*"){
		return filelist
	}
	return filelist.filter(value => {
		return value.indexOf(filetype) > -1
	})
}
