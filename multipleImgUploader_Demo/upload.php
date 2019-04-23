<?php








$images = $_FILES['images'];

try{
	ECHO 'SERVER RESPONSE :';
	for($i=0; $i<count($images['tmp_name']); $i++){
		move_uploaded_file($images['tmp_name'][$i],'./'.$images['name'][$i]);
		echo '<img src="'.$images['name'][$i].'" height="100" >';
	}
	
	
}
catch(Exception $e){
	echo 0;
}