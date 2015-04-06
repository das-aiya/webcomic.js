// API IMPLEMENTATION

var API = {}

API.genericReturn = function (data, callback) {

	if (callback) {
		if (data.result == "success") {
			callback(null, data.msg)
		} else {
			callback(data.msg)
		}
	}
}

API.call = function (url, options, callback) {
	var defaults = {
		url: "/api/",
		dataType: 'json',
		success: function (data) { API.genericReturn(data, callback) }
	} 

	if (url) { defaults.url += url }

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

API.getPage = function (pageNumber, callback) {
	API.call("getPage" + pageNumber, null, callback)
}

API.getPageCount = function (callback) {
	API.call("getPageCount", null, callback)
}


