$(document).ready(function () {

	$.ajax({
		type: "POST",
		url: "../php/proveedores/showProveedores.php",
		success: function(response){
			$('.selector-proveedores select').html(response).fadeIn();
		}
	});
});
