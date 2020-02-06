<?php

	include("../connection.php");#incluimos la base de datos

	$serie = $_REQUEST['serie'];
	$nameEquipo = $_REQUEST['nameEquipo'];
	$detalleEquipo = $_REQUEST['detalleEquipo'];
	$numeroActivo = $_REQUEST['numeroActivo'];
	$fechaFabricacion = $_REQUEST['fechaFabricacion'];
	$nombreGenerico = $_REQUEST['nombreGenerico'];
	$status = $_REQUEST['status'];
	$idequipo = $_REQUEST['idequipo'];

	$query = "update equipo set serieEquipo='$serie', nombreEquipo='$nameEquipo', detalleEquipo='$detalleEquipo', numeroActivo='$numeroActivo', fechaFabricacion='$fechaFabricacion', estadoEquipo='$status', nombreGenerico='$nombreGenerico', fechaModificacionEquipo=NOW() where idequipo = $idequipo";

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
