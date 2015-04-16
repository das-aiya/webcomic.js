API = {}

API.genericReturn = function (data, callback) {
	if (callback) {
		if (data.result == "success") {
			callback(null, data.msg)
		} else {
			callback(data.msg)
		}
	}
}

API.genericReturnText = function (data, callback) {
	callback(null, data)
}

API.call = function (url, options, callback) {
	var defaults = {
		url: "/api/",
		dataType: 'json',
		success: function (data) { 
			console.log('successful request')
			console.log(data)
			API.genericReturn(data, callback) 
		}
	} 

	if (url) { defaults.url += url }
	if (options && options.dataType == 'text'
	&& !options.success) {
		options.success = function (data) { 
			API.genericReturnText(data, callback)
		}
	}

	for (var key in options) {
		defaults[key] = options[key]
	}

	jQuery.ajax(defaults, callback)
}

API.postPage = function (file, callback) {
	var formData = new FormData()

	formData.append("content", file)

	API.call('postPage', {
		type: 'POST',
		data: formData
	}, callback)
}

API.modData = function(pageNumber, data, callback) {
	var form = { "content": data }
	var url = 'modData/' + pageNumber

	API.call(url, {
		type: 'POST',
		data: form
	}, callback)
}

API.modDesc = function(pageNumber, desc, callback) {
	var form = { "content": desc }
	var url = 'modDesc/' + pageNumber

	API.call(url, {
		type: 'POST',
		data: form
	}, callback)
}

API.getPage = function (pageNumber, callback) {
	API.call("getPage" + pageNumber, null, callback)
}

API.getData = function (pageNumber, callback) {
	API.call("getDataParsed/" + pageNumber, null, callback)
}

API.getPageCount = function (callback) {
	API.call("getPageCount", null, callback)
}

API.getUpdatesJSON = function (callback) {
	API.call("getUpdates", null, callback)
}

API.getDescRaw = function (pageNumber, callback) {
	API.call("getDescRaw/" + pageNumber, {dataType: 'text'}, callback)
}
