# Javascript Multiple Image Uploader Class

![require](https://img.shields.io/badge/REQUIRE-JQUERY--3.4.0-brightgreen.svg) ![require](https://img.shields.io/badge/REQUIRE%20-bootstrap--%203%20.x%20%7C%204.x-brightgreen.svg)

## Nedir ?

Jquery ve Bootstrap card elementini kullanarak geliştirmiş olduğum çoklu resim seçici ve yükleyici ile resimleri önizleyebilir , silebilir ve kendi form verilerinizi bozmadan veya kendi form verilerinizle birlikte, ajax ile gönderiminizi sınıf üzerinden yapabilirsiniz.

## Özellikler

* Çoklu Resim seçme
* Önizleme
* Önizleme esnasında resim silme
* Ajax ile gönderim
* Maksimum resim limiti belirleme
* Maksimim resim boyutu belirleme (Mb)
* Uzantı belirleme
* Gönderim Modu Seçimi ( Kendi form verinizle birlikte veya Sadece seçilen resimlerin gönderilmesi)
* Kolay kullanım ve dahil etme

## Kullanım

1. Öncelikle Jquery ve Bootstrapın projenize dahil edildiğinden emin olun veya yok ise ekleyin :
```html
	<script src="https://code.jquery.com/jquery-3.4.0.min.js" integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

2. Şimdi Resim yükleyici Sınıfımızı dahil edelim :

```html
	<link href="multi-image-uploader.css" rel="stylesheet">
	<script src="multi-image-uploader.js"></script>
```
3. Formumuzu ve Resim yükleyici bölgemizin div lerini oluşturalım :
```html

<form method="post" id="myForm" action="upload.php" enctype="multipart/form-data">

<!--  RESİM YÜKLEME VE ÖNİZLEME ALANI  -->
		<div id="uploadArea">
		</div>
<!--  RESİM YÜKLEME VE ÖNİZLEME ALANI  -->
		
 <!--  Örnek diğer form verileri -->
		<input type="text" name="adSoyad">
    <select name="ilce">
			<option value="istanbul">istanbul</option>
		</select>
<!--  Örnek diğer form verileri  -->
		
<!--  RESİM SEÇİMİ İÇİN KULLANDIĞIMIZ INPUT ELEMANI  -->
		<input type="file" multiple id="imageChooseBtn">
<!--  RESİM SEÇİMİ İÇİN KULLANDIĞIMIZ INPUT ELEMANI  -->
		
<button type="submit">GÖNDER</button>
    
 </form>
 
  ```
  
  4. Javascript sınıfımızın çağrılması ve kullanımı :
  ```html

<script>
	
var myUploader = new multipleImageUploader;

myUploader.uploadArea = '#uploadArea';  //resim yükleme alanı div id
myUploader.inputElement = '#imageChooseBtn'; //resim seçme için dinlenecek input elemanı id
myUploader.validExtensions = ['jpg', 'jpeg', 'png']; //yüklenebilecek resim türleri tanımlanması
myUploader.maxImageCount = 5; // seçilebilecek maksimum resim sayısı
myUploader.maxImageMb = 2; // maksimum resim boyutu
    
// Bu özellik form değeri kazanırsa dinlenecek form id'sinin tüm eleman verileri sınıf tarafından
// alınır ve resim verileriyle birleştirilerek gönderilir.
myUploader.dataMode = 'form';
	
// myUploader.dataMode = 'image'; // Bu kullanımda sadece resim verileri gönderilecektir
//


myUploader.init(); //Sınıfın aktif edilmesi

// Formumuzun gönderilme olayının dinlenmesi ve submit tetiklendiğinde çalışacak fonksiyonlarımız
    
myUploader.bindFormSubmit('#myForm',function onClickSubmit(){
	// Veriler gönderilmeden önceki kodlarınız...
	myUploader.sendDatas( //Ajax tetiklenmesi ve veri gönderilmesi
		function success(data){
			//Başarılı callback fonksiyonu
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
  
  
  
