<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$rutLab = $_REQUEST['rutLab'];
	$idlaboratorio = $_REQUEST['idlaboratorio'];

	$query = "update cliente set cliente.nombreCliente='$name', cliente.rutCliente='$rutLab', cliente.fechaModificacionCliente=NOW() where cliente.idcliente=$idlaboratorio";

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
