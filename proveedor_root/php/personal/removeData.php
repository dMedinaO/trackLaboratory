<?php

	include ("../connection.php");

	#obtenemos el id del formulario

	$informacion = [];

	#hacemos la consulta
	$idusuario = $_REQUEST['idusuario'];

	$query = "delete from personalTecnico where personalTecnico.idpersonalTecnico=$idusuario";
	$query2 = "delete from usuario where usuario.idusuario=$idusuario";
	$response['query'] = $query;
	$response['query2'] = $query2;

	$resultado2 = mysqli_query($conexion, $query2);
	$resultado1 = mysqli_query($conexion, $query);
	verificar_resultado( $resultado1, $response );
	cerrar( $conexion );

	function verificar_resultado($resultado, $response){

		if (!$resultado) $informacion["respuesta"] = "ERROR";
		else $informacion["respuesta"] ="BIEN";
		$response['response'] = $informacion;
		echo json_encode($response);
	}

	function cerrar($conexion){
		mysqli_close($conexion);
	}

?>
