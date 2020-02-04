$(document).ready(function () {

	$.ajax({
		type: "POST",
		url: "../php/laboratorios/showClientes.php",
		success: function(response){
			$('.selector-proveedores select').html(response).fadeIn();
		}
	});
});
