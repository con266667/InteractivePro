<html>
<link rel="stylesheet" type="text/css" href="style.css">
<div class="create" id="create">
<head class="header">
    <h1>Upload your videos</h1>
    <title>Get Started</title>
</head>

<div id="createButtons">
<button class="showSetup" id="showSetup" onclick="setupCreate()">Setup</button>
<button class="showPlay" id="showPlay" onclick="showPlay()">Play</button>
</div>
</div>

<script src="script.js"></script>
</html>

<?php
include('setup.html');
include('play.html')
?>

<input class="setupClose" type="button" onclick="setupClose()" value="Save" id="setupClose" style="display: none">

