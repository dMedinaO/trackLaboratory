
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
	    var t = $('#usersData').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/personal/showData.php"
					},

					"columns":[
						{"data":"nombrePersonal"},
						{"data":"rutPersonal"},
						{"data":"nombreUsuario"},
						{"data":"emailUsuario"},
						{"data":"passwordUsuario"},
						{"data":"createdUsuario"},
						{"data":"modifiedUsuario"},
						{"defaultContent": "<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		obtener_id_eliminar("#usersData tbody", t);
		obtener_data_editar("#usersData tbody", t);
	}

	var obtener_id_eliminar = function(tbody, table){
		$(tbody).on("click", "button.eliminar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idusuario = $("#frmEliminar #idusuario").val(data.idusuario);
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idusuario = $("#frmEditar #idusuario").val(data.idusuario);
			var name = $("#frmEditar #name").val(data.nombreUsuario);
			var emailUsuario = $("#frmEditar #emailUsuario").val(data.emailUsuario);
			var passwordUsuario = $("#frmEditar #passwordUsuario").val(data.passwordUsuario);
			var nameFull = $("#frmEditar #nameFull").val(data.nombrePersonal);
			var rut = $("#frmEditar #rut").val(data.rutPersonal);

		});
	}

	var eliminar = function(){
		$("#eliminar-usuario").on("click", function(){
			var idusuario = $("#frmEliminar #idusuario").val();
			$.ajax({
				method:"POST",
				url: "../php/personal/removeData.php",
				data: {
						"idusuario": idusuario
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-usuario").on("click", function(){

			var idusuario = $("#frmEditar #idusuario").val();
			var name = $("#frmEditar #name").val();
			var emailUsuario = $("#frmEditar #emailUsuario").val();
			var passwordUsuario = $("#frmEditar #passwordUsuario").val();
			var nameFull = $("#frmEditar #nameFull").val();
			var rut = $("#frmEditar #rut").val();

			$.ajax({
				method: "POST",
				url: "../php/personal/editData.php",
				data: {
					"nameFull"   : nameFull,
					"rut"   : rut,
					"name"   : name,
					"emailUsuario"   : emailUsuario,
					"idusuario"   : idusuario,
					"passwordUsuario"   : passwordUsuario
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-usuario").on("click", function(){

			var nameFull = $("#frmAgregar #nameFull").val();
			var rut = $("#frmAgregar #rut").val();
			var name = $("#frmAgregar #name").val();
			var emailUsuario = $("#frmAgregar #emailUsuario").val();
			var passwordUsuario = $("#frmAgregar #passwordUsuario").val();

			$.ajax({
				method: "POST",
				url: "../php/personal/addData.php",
				data: {
						"nameFull"   : nameFull,
						"rut"   : rut,
						"name"   : name,
						"emailUsuario"   : emailUsuario,
						"passwordUsuario"   : passwordUsuario
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
