# Javascript Multiple Image Uploader Class

![require](https://img.shields.io/badge/REQUIRE-JQUERY--3.4.0-brightgreen.svg) ![require](https://img.shields.io/badge/REQUIRE%20-bootstrap--%203%20.x%20%7C%204.x-brightgreen.svg)

## What ?

Multiple image picker and uploader class . I developed using jquery and bootstrap. Easy include and Simple use

## Features

* Mulitple image choose
* Image Preview
* Delete images during preview
* All Data send with ajax
* Setting Max image count
* Setting Max image size (mb)
* Setting Valid image extensions
* 2 different mode => form  & image ( just send image files or include your own form data)
* Easy use , Simple include

## How to use

1. First, make sure that Jquery and Bootstrap are included in your project or add :
```html
	<script src="https://code.jquery.com/jquery-3.4.0.min.js" integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

2. Now let's include image loader class:

```html
	<link href="multipleImgUploader/multi-image-uploader.css" rel="stylesheet">
	<script src="multipleImgUploader/multi-image-uploader.js"></script>
```
3. Let's create our form region:
```html

<form method="post" id="myForm" action="upload.php" enctype="multipart/form-data">

<!-- PICTURE LOADING AND PREVIEW AREA -->
		<div id="uploadArea">
		</div>
<!-- PICTURE LOADING AND PREVIEW AREA -->
		
 <!--  Sample other form data -->
		<input type="text" name="adSoyad">
    <select name="ilce">
			<option value="istanbul">istanbul</option>
		</select>
<!--  Sample other form data -->
		
<!-- INPUT ELEMENT FOR PICTURE SELECTION  -->
		<input type="file" multiple id="imageChooseBtn">
<!-- INPUT ELEMENT FOR PICTURE SELECTION   -->
		
<button type="submit">GÖNDER</button>
    
 </form>
 
  ```
  
  4. Calling and using class:
  ```html

<script>
	
var myUploader = new multipleImageUploader;

myUploader.uploadArea = '#uploadArea';  // image preview region div id
myUploader.inputElement = '#imageChooseBtn'; //file input element id for image choose
myUploader.validExtensions = ['jpg', 'jpeg', 'png']; // set valid image extensions
myUploader.maxImageCount = 5; // set max image count
myUploader.maxImageMb = 2; // set max image size
    
// if the value of this variable is "form" : images are sent together with other form data
// if the value of this variable is "image" : just images data send 
myUploader.dataMode = 'form';
//


myUploader.init(); // init

// Formumuzun gönderilme olayının dinlenmesi ve submit tetiklendiğinde çalışacak fonksiyonlarımız
    
myUploader.bindFormSubmit('#myForm',function onClickSubmit(){
	// your before send codes...
	myUploader.sendDatas( // Ajax triggering and sending of data
		function success(data){
			//success callback
			$('#response').html(data);
			console.log(data);
		},
		function error(data){
			//for error callback
		}
	);
	
});


</script>
  ```
  
  
  
