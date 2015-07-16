<?php 
	$archivo =  $_COOKIE["jsonarchivo"];
	file_put_contents("json/lista.json", $archivo);
?>