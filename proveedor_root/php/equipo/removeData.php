<?php

	include ("../connection.php");

	#obtenemos el id del formulario

	$informacion = [];

	#hacemos la consulta
	$idequipo = $_REQUEST['idequipo'];

	$query = "delete from equipo where equipo.idequipo=$idequipo";
	$response['query'] = $query;

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
