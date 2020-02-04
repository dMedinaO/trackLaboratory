<?php

	include("../connection.php");#incluimos la base de datos

	$name = $_REQUEST['name'];
	$emailUsuario = $_REQUEST['emailUsuario'];
	$idusuario = $_REQUEST['idusuario'];
	$passwordUsuario = $_REQUEST['passwordUsuario'];

	$query = "update usuario set usuario.nombreUsuario='$name', usuario.emailUsuario='$emailUsuario', usuario.passwordUsuario='$passwordUsuario', usuario.modifiedUsuario=NOW() where usuario.idusuario=$idusuario";

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
