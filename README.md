#simple-file-list
Reads a folder, list all files, can save to disk.


###**require**
as a regular node-module

* ```npm i simple-file-list --save```

```js
const sfl = require('simple-file-list')

// list all files
sfl('./folder').then(result => {
	console.log(result)
})

// list all files matching with png
sfl('./folder', 'png').then(result => {
	console.log(result)
})

// list all files matching png and save to list.json
sfl('./folder', 'png, 'list.json).then(result => {
	console.log(result)
})

```



###**cli**
run from terminal

* ```npm i -g simple-file-list```

```bash
$ simple-file-list ./folder
or
$ simple-file-list ./folder png
or
$ simple-file-list ./folder png list.json
```
