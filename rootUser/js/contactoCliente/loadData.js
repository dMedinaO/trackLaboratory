
// Tables-DataTables.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -



$(window).on('load', function() {

	listar();
	guardar();
	eliminar();
	editar();

});
    // DATA TABLES
    // =================================================================
    // Require Data Tables
    // -----------------------------------------------------------------
    // http://www.datatables.net/
    // =================================================================

    $.fn.DataTable.ext.pager.numbers_length = 5;

    //listamos los datos...
		var listar = function(){

			var idcliente = getElementURL('idcliente');

	    var t = $('#areas').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/contactoCliente/showData.php?idcliente="+idcliente
					},

					"columns":[
						{"data":"nombre"},
						{"data":"telefono"},
						{"data":"email"},
						{"data":"fechaCreacionContactoCliente"},
						{"data":"fechaModificacionContactoCliente"},
						{"defaultContent": "<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		obtener_id_eliminar("#areas tbody", t);
		obtener_data_editar("#areas tbody", t);
	}

	var obtener_id_eliminar = function(tbody, table){
		$(tbody).on("click", "button.eliminar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idcontactoCliente = $("#frmEliminar #idcontactoCliente").val(data.idcontactoCliente);

		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idcontactoCliente = $("#frmEditar #idcontactoCliente").val(data.idcontactoCliente);
			var name = $("#frmEditar #name").val(data.nombre);
			var telefono = $("#frmEditar #telefono").val(data.telefono);
			var email = $("#frmEditar #email").val(data.email);

		});
	}

	var eliminar = function(){
		$("#eliminar-contacto").on("click", function(){
			var idcontactoCliente = $("#frmEliminar #idcontactoCliente").val();
			$.ajax({
				method:"POST",
				url: "../php/contactoCliente/removeData.php",
				data: {
						"idcontactoCliente": idcontactoCliente
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-contacto").on("click", function(){

			var idcontactoCliente = $("#frmEditar #idcontactoCliente").val();
			var name = $("#frmEditar #name").val();
			var telefono = $("#frmEditar #telefono").val();
			var email = $("#frmEditar #email").val();

			$.ajax({
				method: "POST",
				url: "../php/contactoCliente/editData.php",
				data: {
					"name"   : name,
					"telefono"   : telefono,
					"email"   : email,
					"idcontactoCliente": idcontactoCliente
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-contacto").on("click", function(){

			var name = $("#frmAgregar #name").val();
			var telefono = $("#frmAgregar #telefono").val();
			var email = $("#frmAgregar #email").val();
			var idcliente = getElementURL('idcliente');

			$.ajax({
				method: "POST",
				url: "../php/contactoCliente/addData.php",
				data: {
						"name"   : name,
						"telefono"   : telefono,
						"email"   : email,
						"idcliente"   : idcliente
					}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var mostrar_mensaje = function( informacion ){

		var texto = "", color = "";
		if( informacion.respuesta == "BIEN" ){
			texto = "<strong>Bien!</strong> Se han guardado los cambios correctamente.";
			color = "#379911";
		}else if( informacion.respuesta == "ERROR"){
			texto = "<strong>Error</strong>, no se ejecutó la consulta.";
			color = "#C9302C";
		}else if( informacion.respuesta == "EXISTE" ){
			texto = "<strong>Información!</strong> el usuario ya existe.";
			color = "#5b94c5";
		}else if( informacion.respuesta == "VACIO" ){
			texto = "<strong>Advertencia!</strong> debe llenar todos los campos solicitados.";
			color = "#ddb11d";
		}else if( informacion.respuesta == "OPCION_VACIA" ){
			texto = "<strong>Advertencia!</strong> la opción no existe o esta vacia, recargar la página.";
			color = "#ddb11d";
		}

		$(".mensaje").html( texto ).css({"color": color });
		$(".mensaje").fadeOut(5000, function(){
			$(this).html("");
			$(this).fadeIn(3000);
		});
	}

	var idioma_espanol = {
	    "sProcessing":     "Procesando...",
	    "sLengthMenu":     "Mostrar _MENU_ registros",
	    "sZeroRecords":    "No se encontraron resultados",
	    "sEmptyTable":     "Ningún dato disponible en esta tabla",
	    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
	    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
	    "sInfoPostFix":    "",
	    "sSearch":         "Buscar:",
	    "sUrl":            "",
	    "sInfoThousands":  ",",
	    "sLoadingRecords": "Cargando...",
	    "oPaginate": {
	        "sFirst":    "Primero",
	        "sLast":     "Último",
	        "sNext":     "Siguiente",
	        "sPrevious": "Anterior"
	    },
	    "oAria": {
	        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
	        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
	    }
	}

function getElementURL(key) {

	  var url_string = window.location;
		var url = new URL(url_string);
		var c = url.searchParams.get(key);
		return c;
	}
