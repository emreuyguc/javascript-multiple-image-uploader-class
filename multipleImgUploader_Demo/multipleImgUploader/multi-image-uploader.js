/*

AUTHOR : EMRE UTKU UYGUÇ
UPDATE : 24.04.2019

fixed max size problem
*/

class multipleImageUploader{

	constructor(){
		this.ImageCountErrorMsg = 'Uyarı : Bazı Resimler Yüklenemedi . Seçebileceğiniz Maksimum Resim Sayısı : ';
		this.ImageSizeErrorMsg = ' Adlı fotoğraf izin verilen boyutu aşıyor. Maksimum $maxSize mb boyutunda olabilir. ';
		this.AreaHeaderText = 'Resimler';
		this.ImageExtErrorMsg = ' Adlı resminiz izin verilen bir formatta değil';
	}
	
	showMessage(type,msg){
		$('#msgArea').append('<div class="alert alert-'+ type +'" role="alert">'+ msg +'</div>').fadeTo(2000, 500).slideUp(500, function(){
			$('#msgArea').remove('').slideUp(500);
		});
					
	}
	
	bindFormSubmit(formId , formSubmitAction){
		var self = this;
		this.formId = formId;
		$(formId).submit(function(e){
			e.preventDefault();
			if(self.sendDatasMode == 'form'){
				var otherFormData = $(this).serializeArray();
				for(var item in otherFormData){
					self.formData.append(otherFormData[item]['name'] , otherFormData[item]['value']);
				}
			}
			
			formSubmitAction();
		});
	}
	
	sendDatas(succesCallback , errorCallback){
		var self = this;
		$.ajax({
			type: $(self.formId).attr('method'),
			url: $(self.formId).attr('action'),
			data: self.formData,
			processData: false,
			contentType: false,
			cache: false,
			async:true,
			success: function (data) {
				succesCallback(data);
			},
			error: function (data) {
				errorCallback(data);
			},
		});
	}
	
	init(){
		var self = this;
		self.maxImageMb = self.maxImageMb * 1024 * 1024;
		$(this.inputElement).change( function(e){
			self.formData = new FormData();
			var images = e.target.files;
			if (images.length > 0) {
				$(self.uploadArea).html('\
				<div class="card text-center">\
					<div class="card-header"> \
					'+ self.AreaHeaderText +' \
					<div id="msgArea"> </div> \
					</div>\
					<div class="card-body" id="imagesArea" style="display:flex; flex-wrap:wrap; ">\
					</div>\
				</div>\
				');
				
				for (var i = 0; i < images.length; i++) {
					if(typeof self.maxImageCount != 'undefined' & i == self.maxImageCount ){
						self.showMessage('info',self.ImageCountErrorMsg  + self.maxImageCount );
						break;
					}
					else{
						var imageExt = images[i].name.split('.').pop().toLowerCase();
						var imageSize = images[i].size;
						var isValidExt = self.validExtensions.indexOf(imageExt) > -1;
						if (isValidExt) {
							if (imageSize <= self.maxImageMb) {
								var reader = new FileReader();
								reader.onload = function(e) {
									var imageLoader = new Image(); 
									imageLoader.src = e.target.result;
									imageLoader.onload = function(){
										 var scaleHeight = imageLoader.height * 200 / imageLoader.width;
										 $('#imagesArea').append('<div class="card text-white bg-dark" style="max-width: 15rem;margin-top:5px; margin-right : 5px" id="imgCard-' + e.target.imageId + '"> \
																	<div class="card-header">' + e.target.imageName.slice(0,25) + '</div> \
																	<div class="card-body" id="myImgCard"> \
																	<img src="' + e.target.result + '" class="card-title myImgsrc" height="'+scaleHeight+'"  width="200"></img> \
																	<div class="myImageHover"> \
																	<a class="btn btn-danger" id="imageDelete" card-id="' + e.target.imageId + '" image-name="' + e.target.imageName + '">Sil \
																	</a> \
																	\
																	</div> \
																	</div> \
																</div> ');
									};
								
								}
								reader.imageName = images[i].name;
								reader.imageId = i;
								reader.readAsDataURL(images[i]);
	
								self.formData.append('images[]', images[i]);
							} 
							else{
								self.showMessage('danger',  images[i].name + self.ImageSizeErrorMsg.replace('$maxSize',self.maxImageMb / Math.pow(1024,2)));
							}
						}
						else{
							self.showMessage('warning',images[i].name + self.ImageExtErrorMsg);
						}
					}
				}
				$(self.inputElement).val('');	
			}
		});
		
		$(document).on('click', '#imageDelete', function(e) {
			var deleteImageId = $(this).attr("card-id");
			
			//
			
			var images = self.formData.getAll("images[]");
			var cloneData = {};
			
			jQuery.each(images, function(i, image) {
			  cloneData['image-'+i] = image;
			});
			
			cloneData['image-'+deleteImageId] = '';
			
			self.formData = new FormData();
			for(var item in cloneData){
				self.formData.append('images[]', cloneData[item]);
			}
			
			//
			
			
			$("#imgCard-"+deleteImageId).remove();
			
			
		});
		
	}
	
	
}
