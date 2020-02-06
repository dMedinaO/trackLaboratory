<?php

	include("../connection.php");#incluimos la base de datos

	$nameFull = $_REQUEST['nameFull'];
	$rut = $_REQUEST['rut'];

	$name = $_REQUEST['name'];
	$emailUsuario = $_REQUEST['emailUsuario'];
	$idusuario = $_REQUEST['idusuario'];
	$passwordUsuario = $_REQUEST['passwordUsuario'];

	$query = "update usuario set usuario.nombreUsuario='$name', usuario.emailUsuario='$emailUsuario', usuario.passwordUsuario='$passwordUsuario', usuario.modifiedUsuario=NOW() where usuario.idusuario=$idusuario";
	$query2 = "update personalTecnico set nombrePersonal='$nameFull', rutPersonal='$rut', modificacionPersonalTecnico=NOW() where idpersonalTecnico = $idusuario";

	$resultado = mysqli_query($conexion, $query);
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
