<?php


?>



<!DOCTYPE html>
<html data-ng-app="">
<head>
	<title>Using AngularJS Directives and Data Biding</title>
</head>
<body data-ng-init="customers=[{name:'John Smith', city:'Phoenix'}, {name:'John Doe', city:'NewYork'},{name:'Jane Doe', city:'Sanfrancisco'}]">

	Name:
	<br />
	<input type="text" data-ng-model="name" /> 
	<br />
	<ul>
		<li data-ng-repeat="cust in customers | filter:name | orderBy:'city'"> {{ cust.name | uppercase }} - {{ cust.city | lowercase }}</li>
	</ul>
	<script src="Scripts/angular.min.js"></script>
	
	
	
</body>
</html>