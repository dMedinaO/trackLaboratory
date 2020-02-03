<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$telefono = $_REQUEST['telefono'];
	$email = $_REQUEST['email'];
	$idcontactoCliente = $_REQUEST['idcontactoCliente'];

	$query = "update contactoCliente set nombre='$name', telefono='$telefono', email='$email', fechaModificacionContactoCliente=NOW() where idcontactoCliente=$idcontactoCliente";

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
