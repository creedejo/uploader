<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(isset($_FILES['file'])){

	$dir = 'uploads/';
	$file = $_FILES['file'];
	
	$target_file = $dir . $file['name'];
	$uploaded = move_uploaded_file($file['tmp_name'], $target_file);
	
	if($uploaded){
		echo 'FILE WAS UPLOADED TO: ' . $target_file;
	}
	else{
		echo 'There was an error uploading your file.  Please try again';
	}
	
}
else{
	echo 'No file was found.  Please try again.';
}

?>