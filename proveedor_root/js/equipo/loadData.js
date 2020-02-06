
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
	    var t = $('#equipo').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/equipo/showData.php"
					},

					"columns":[
						{"data":"serieEquipo"},
						{"data":"nombreEquipo"},
						{"data":"detalleEquipo"},
						{"data":"numeroActivo"},
						{"data":"fechaFabricacion"},
						{"data":"estadoEquipo"},
						{"data":"nombreGenerico"},
						{"data":"fechaCreacionEquipo"},
						{"data":"fechaModificacionEquipo"},
						{"defaultContent": "<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		obtener_id_eliminar("#equipo tbody", t);
		obtener_data_editar("#equipo tbody", t);
	}

	var obtener_id_eliminar = function(tbody, table){
		$(tbody).on("click", "button.eliminar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idequipo = $("#frmEliminar #idequipo").val(data.idequipo);
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var serie = $("#frmEditar #serie").val(data.serieEquipo);
			var nameEquipo = $("#frmEditar #nameEquipo").val(data.nombreEquipo);
			var detalleEquipo = $("#frmEditar #detalleEquipo").val(data.detalleEquipo);
			var numeroActivo = $("#frmEditar #numeroActivo").val(data.numeroActivo);
			var fechaFabricacion = $("#frmEditar #fechaFabricacion").val(data.fechaFabricacion);
			var nombreGenerico = $("#frmEditar #nombreGenerico").val(data.nombreGenerico);
			var idequipo = $("#frmEditar #idequipo").val(data.idequipo);

		});
	}

	var eliminar = function(){
		$("#eliminar-equipo").on("click", function(){
			var idequipo = $("#frmEliminar #idequipo").val();
			$.ajax({
				method:"POST",
				url: "../php/equipo/removeData.php",
				data: {
						"idequipo": idequipo
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-equipo").on("click", function(){

			var serie = $("#frmEditar #serie").val();
			var nameEquipo = $("#frmEditar #nameEquipo").val();
			var detalleEquipo = $("#frmEditar #detalleEquipo").val();
			var numeroActivo = $("#frmEditar #numeroActivo").val();
			var fechaFabricacion = $("#frmEditar #fechaFabricacion").val();
			var nombreGenerico = $("#frmEditar #nombreGenerico").val();
			var idequipo = $("#frmEditar #idequipo").val();
			var status = $("#frmEditar #status").val();


			$.ajax({
				method: "POST",
				url: "../php/equipo/editData.php",
				data: {
					"serie"   : serie,
					"nameEquipo"   : nameEquipo,
					"detalleEquipo"   : detalleEquipo,
					"numeroActivo"   : numeroActivo,
					"fechaFabricacion"   : fechaFabricacion,
					"nombreGenerico" : nombreGenerico,
					"status" : status,
					"idequipo" : idequipo
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-equipo").on("click", function(){

			var serie = $("#frmAgregar #serie").val();
			var nameEquipo = $("#frmAgregar #nameEquipo").val();
			var detalleEquipo = $("#frmAgregar #detalleEquipo").val();
			var numeroActivo = $("#frmAgregar #numeroActivo").val();
			var fechaFabricacion = $("#frmAgregar #fechaFabricacion").val();
			var nombreGenerico = $("#frmAgregar #nombreGenerico").val();
			var status = $("#frmAgregar #status").val();

			$.ajax({
				method: "POST",
				url: "../php/equipo/addData.php",
				data: {
						"serie"   : serie,
						"nameEquipo"   : nameEquipo,
						"detalleEquipo"   : detalleEquipo,
						"numeroActivo"   : numeroActivo,
						"fechaFabricacion"   : fechaFabricacion,
						"nombreGenerico" : nombreGenerico,
						"status" : status
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
