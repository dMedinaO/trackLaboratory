
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
						"url": "../php/sucursalesCliente/showData.php?idcliente="+idcliente
					},

					"columns":[
						{"data":"nombreSucursal"},
						{"data":"tipoSucursal"},
						{"data":"region"},
						{"data":"provincia"},
						{"data":"comuna"},
						{"data":"ciudad"},
						{"data":"direccion"},
						{"data":"codigoPostal"},
						{"data":"fechaCreacionSucursal"},
						{"data":"fechaModificacionSucursal"},
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
			var idsucursal = $("#frmEliminar #idsucursal").val(data.idsucursal);
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){
			var data = table.row( $(this).parents("tr") ).data();
			var idsucursal = $("#frmEditar #idsucursal").val(data.idsucursal);
			var name = $("#frmEditar #name").val(data.nombreSucursal);
			var region = $("#frmEditar #region").val(data.region);
			var provincia = $("#frmEditar #provincia").val(data.provincia);
			var comuna = $("#frmEditar #comuna").val(data.comuna);
			var ciudad = $("#frmEditar #ciudad").val(data.ciudad);
			var direccion = $("#frmEditar #direccion").val(data.direccion);
			var codigoPostal = $("#frmEditar #codigoPostal").val(data.codigoPostal);

		});
	}

	var eliminar = function(){
		$("#eliminar-sucursal").on("click", function(){
			var idsucursal = $("#frmEliminar #idsucursal").val();
			$.ajax({
				method:"POST",
				url: "../php/sucursalesCliente/removeData.php",
				data: {
						"idsucursal": idsucursal
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-sucursal").on("click", function(){

			var idsucursal = $("#frmEditar #idsucursal").val();
			var name = $("#frmEditar #name").val();
			var region = $("#frmEditar #region").val();
			var provincia = $("#frmEditar #provincia").val();
			var comuna = $("#frmEditar #comuna").val();
			var ciudad = $("#frmEditar #ciudad").val();
			var direccion = $("#frmEditar #direccion").val();
			var codigoPostal = $("#frmEditar #codigoPostal").val();

			$.ajax({
				method: "POST",
				url: "../php/sucursalesCliente/editData.php",
				data: {
					"name"   : name,
					"region"   : region,
					"provincia"   : provincia,
					"comuna"   : comuna,
					"ciudad"   : ciudad,
					"direccion"   : direccion,
					"codigoPostal"   : codigoPostal,
					"idsucursal" : idsucursal
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-sucursal").on("click", function(){

			var idcliente = getElementURL('idcliente');
			var name = $("#frmAgregar #name").val();
			var region = $("#frmAgregar #region").val();
			var provincia = $("#frmAgregar #provincia").val();
			var comuna = $("#frmAgregar #comuna").val();
			var ciudad = $("#frmAgregar #ciudad").val();
			var direccion = $("#frmAgregar #direccion").val();
			var codigoPostal = $("#frmAgregar #codigoPostal").val();

			$.ajax({
				method: "POST",
				url: "../php/sucursalesCliente/addData.php",
				data: {
						"name"   : name,
						"region"   : region,
						"provincia"   : provincia,
						"comuna"   : comuna,
						"ciudad"   : ciudad,
						"direccion"   : direccion,
						"codigoPostal"   : codigoPostal,
						"idcliente" : idcliente
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
