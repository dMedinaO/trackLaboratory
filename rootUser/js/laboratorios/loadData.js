
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
	    var t = $('#clientes').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/laboratorios/showData.php"
					},

					"columns":[
						{"data":"nombreCliente"},
						{"data":"rutCliente"},
						{"data":"fechaCreacionCliente"},
						{"data":"fechaModificacionCliente"},
						{"defaultContent": "<button type='button' class='contactos btn btn-success'><i class='fa fa-group'></i></button> <button type='button' class='sucursales btn btn-warning'><i class='fa fa-home'></i></button> <button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		obtener_id_eliminar("#clientes tbody", t);
		obtener_data_editar("#clientes tbody", t);
		obtener_data_contactos("#clientes tbody", t);
		obtener_data_sucursales("#clientes tbody", t);
	}

	var obtener_data_contactos = function(tbody, table){
		$(tbody).on("click", "button.contactos", function(){
			var data = table.row( $(this).parents("tr") ).data();
			location.href="../contactoCliente/?idcliente="+data.idcliente;
		});
	}

	var obtener_data_sucursales = function(tbody, table){
		$(tbody).on("click", "button.sucursales", function(){
			var data = table.row( $(this).parents("tr") ).data();
			location.href="../sucursalesLab/?idcliente="+data.idcliente;
		});
	}

	var obtener_id_eliminar = function(tbody, table){
		$(tbody).on("click", "button.eliminar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idlaboratorio = $("#frmEliminar #idlaboratorio").val(data.idcliente);
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var name = $("#frmEditar #name").val(data.nombreCliente);
			var rutLab = $("#frmEditar #rutLab").val(data.rutCliente);
			var idlaboratorio = $("#frmEditar #idlaboratorio").val(data.idcliente);

		});
	}

	var eliminar = function(){
		$("#eliminar-laboratorio").on("click", function(){
			var idlaboratorio = $("#frmEliminar #idlaboratorio").val();
			$.ajax({
				method:"POST",
				url: "../php/laboratorios/removeData.php",
				data: {
						"idlaboratorio": idlaboratorio
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-laboratorio").on("click", function(){

			var name = $("#frmEditar #name").val();
			var rutLab = $("#frmEditar #rutLab").val();
			var idlaboratorio = $("#frmEditar #idlaboratorio").val();

			$.ajax({
				method: "POST",
				url: "../php/laboratorios/editData.php",
				data: {
					"name"   : name,
					"rutLab"   : rutLab,
					"idlaboratorio" : idlaboratorio
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-area").on("click", function(){

			var name = $("#frmAgregar #name").val();
			var rutLab = $("#frmAgregar #rutLab").val();

			$.ajax({
				method: "POST",
				url: "../php/laboratorios/addData.php",
				data: {
						"name"   : name,
						"rutLab"   : rutLab
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
