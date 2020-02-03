<?php

	include("../connection.php");#incluimos la base de datos

	$idarea = $_REQUEST['idarea'];
	$name = $_REQUEST['name'];
	$descripcion = $_REQUEST['descripcion'];

	$query = "update area set area.nombreArea = '$name', area.descripcionArea='$descripcion', area.fechaModificacionArea=NOW() where area.idarea=$idarea";

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
