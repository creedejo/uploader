var $uploader = document.getElementById('uploader');
var $form = $("#file-form");
var $status = $(".status");


$(document).ready(function(){
	//check for browser support
	if(window.FileReader){
		$uploader.addEventListener('dragover',function(e){
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect='copy';
			$(this).addClass('dragover');
			$status.html("Drop the file here to upload.");
			$status.fadeIn();
		},false);

		$uploader.addEventListener('dragleave',function(e){
			e.stopPropagation();
			e.preventDefault();
			$(this).removeClass('dragover');
			$status.html("");
			$status.fadeOut();
		},false);

		$uploader.addEventListener('drop',function(e){
			e.stopPropagation();
			e.preventDefault();

			var uploadable = true;
			var validation_error = "";
			var file=e.dataTransfer.files[0];

			//check file type
			var file_type = file.type;
			console.log("FILE TYPE: " + file_type);

			//check if the file is an image
			if(file_type!="image/png" && file_type!="image/jpeg" && file_type!="image/gif"){
				uploadable=false;
				validation_error = "The file must be an image"
			}

			//check file size
			var file_size = file.size;
			console.log("FILE SIZE: " + file_size);
			var max_file = 10000;
			if(file_size>max_file){
				uploadable=false;
				if(validation_error!=""){
					validation_error+="<br>";
				}
				validation_error+="The file is too large.  It must be smaller than 10Mb";
			}

			if(uploadable){


				var data = new FormData();
				data.append('file',file,file.name);
				$status.html("Uploading...");
				$status.fadeIn();
				$.ajax({
				    url : "upload.php",
				    type: "POST",
				    data : data,
				    processData:false,
				    contentType:false,
				    success: function(data, textStatus, jqXHR)
				    {
				        console.log("SUCCESS - " + data);
				        $status.html(data);
				        //$status.fadeIn();
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		console.log("ERROR");
				    }
				});

			}
			else{
				validation_error = "<h2>Unable to upload file:</h2>" + validation_error;
				 $status.html(validation_error);
			}
			
		},false);
	}
	else{
		alert("I'm sorry.  Your browser does not support this upload method.");
	}
});