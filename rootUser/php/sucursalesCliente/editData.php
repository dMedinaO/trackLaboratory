<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$region = $_REQUEST['region'];
	$provincia = $_REQUEST['provincia'];
	$comuna = $_REQUEST['comuna'];
	$ciudad = $_REQUEST['ciudad'];
	$direccion = $_REQUEST['direccion'];
	$codigoPostal = $_REQUEST['codigoPostal'];
	$idsucursal = $_REQUEST['idsucursal'];

	$query1 = "update sucursal set sucursal.nombreSucursal='$name', sucursal.fechaModificacionSucursal=NOW() where sucursal.idsucursal=$idsucursal";
	$query2 = "update direccion set region='$region', provincia='$provincia', comuna='$comuna', ciudad='$ciudad', direccion='$direccion', codigoPostal='$codigoPostal' where direccion.iddireccion=$idsucursal";

	$resultado = mysqli_query($conexion, $query1);
	$resultado = mysqli_query($conexion, $query2);

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
