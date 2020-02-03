<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$telefono = $_REQUEST['telefono'];
	$email = $_REQUEST['email'];
	$idcontactoProveedor = $_REQUEST['idcontactoProveedor'];

	$query = "update contactoProveedor set nombreContacto='$name', telefonoContacto='$telefono', emailContacto='$email', modificacion_proveedorContacto=NOW() where idcontactoProveedor=$idcontactoProveedor";

	$resultado = mysqli_query($conexion, $query);

	verificar_resultado( $resultado);
	cerrar( $conexion );

	function verificar_resultado($resultado){

		if (!$resultado) $informacion["respuesta"] = "ERROR";
		else $informacion["respuesta"] ="BIEN";
		echo json_encode($informacion);
	}

	function cerrar($conexion){
		mysqli_close($conexion);
	}
?>
