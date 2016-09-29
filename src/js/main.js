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
		},false);

		$uploader.addEventListener('drop',function(e){
			e.stopPropagation();
			e.preventDefault();
			var file=e.dataTransfer.files[0];
			var data = new FormData();
			data.append('file',file,file.name);
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
			        $status.fadeIn();
			    },
			    error: function (jqXHR, textStatus, errorThrown)
			    {
			 		console.log("ERROR");
			    }
			});
			
		},false);
	}
	else{
		alert("I'm sorry.  Your browser does not support this upload method.");
	}
});