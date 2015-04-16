jQuery.ready(function (){
	async.waterfall([
		API.getUpdatesJSON,
		function (results) {
			var updatesData = results
			var updatesHTML = jQuery('.update')
			for (var i = 0; i < updatesHTML.length; i++) {
				updatesHTML.click(function () {
					
				})
			}
		}
	], function (err, results) {
		if (err) {
			console.log(err)
		}
	})
})
