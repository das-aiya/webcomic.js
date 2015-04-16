Panel = {}

Panel.editPage = function (updateHTML, updateData) {
	
}

Panel.editText = function (updateHTML, updateData, selector) {
	var descTag = updateHTML[0]
	async.waterfall([
		function (callback) {
			API.getDescRaw(updateData.num, function (err, results) {
				callback(err, results)
			})
		},
		function (results, callback) {
			var selected = jQuery(selector, updateHTML)
			selected.hallo({
				plugins: {
					'halloformat': {}
				}
			})
			callback(null, results)
		}
	], function (err, results) {
		if (err) {
			console.log(err)
		} else {
			console.log(results)
		}
	})
}

Panel.submitPage = function () {
	var name = document.getElementById("editName").value
	var tags = document.getElementById("editTags").value.split(",")
	var desc = document.getElementById("editDesc").value
	var file = document.getElementById("fileForm")

	async.waterfall([
		function (callback) {
			API.getData(num, callback)
		},
		function (results, callback) {
			results.tags = tags
			results.name = name
			results = JSON.stringify(results)
			API.modData(num, results, callback)
		},
		function (results, callback) {
			API.modDesc(num, desc, callback)
		},
		function (results, callback) {
			if (file.files.length > 0) {
				var formData = new FormData()
				formData.append("content", file.files[0])
				API.call('modPage/' + num, {
					type: "POST",
					data: formData,
					processData: false
				}, callback)
			}
		}
	], function (err, results) {
		window.location.href = "/admin"
		if(err) {
			console.log(err)
		} else {
			console.log("we did it")
		}

	})
}
