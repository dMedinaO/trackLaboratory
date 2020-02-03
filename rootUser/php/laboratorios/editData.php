<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$empresa = $_REQUEST['empresa'];
	$correoContacto = $_REQUEST['correoContacto'];
	$telefono = $_REQUEST['telefono'];
	$password = $_REQUEST['password'];
	$idadministrador = $_REQUEST['idadministrador'];

	$query = "update administrador set nombreAdmin='$name', empresa='$empresa', correoContacto='$correoContacto', telefonoContacto='$telefono', password='$password' where idadministrador=$idadministrador";

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
