// Load the Visualization API and the chart package.

google.load('visualization', '1', {'packages':['corechart']});

// Set a callback to run when the Google visualization API is loaded.

google.setOnLoadCallback(drawChart);

function drawChart() {
	
	var jsonData = $.ajax({
		url : "graphData.php",
		dataType : "json",
		async : false
	}).responseText;;
	
	// Create our data table out of JSON data loaded from server.
	
	var data = new google.visualization.DataTable(jsonData);
	
	// Instantiate and draw our chart, passing in some options.
	
	var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
	chart.draw(data, {width : 400, height : 240});
	
}