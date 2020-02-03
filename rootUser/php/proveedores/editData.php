<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$rutLab = $_REQUEST['rutLab'];
	$idproveedor = $_REQUEST['idproveedor'];

	$query = "update proveedor set proveedor.nombreProveedor='$name', rutProveedor='$rutLab', modificacion_proveedor=NOW() where idproveedor=$idproveedor";

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
