<?php

	include ("../connection.php");

	#obtenemos el id del formulario

	$informacion = [];

	#hacemos la consulta
	$idsucursal = $_REQUEST['idsucursal'];


	$query = "delete from sucursal where sucursal.idsucursal=$idsucursal";
	$query2 = "delete from direccion where direccion.iddireccion=$idsucursal";
	$response['query'] = $query;

	$resultado = mysqli_query($conexion, $query);
	$resultado = mysqli_query($conexion, $query2);
	verificar_resultado( $resultado, $response );
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
