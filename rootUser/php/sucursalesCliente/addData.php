<?php

	include("../connection.php");#incluimos la base de datos

	#hacemos la obtencion de los datos
	$name = $_REQUEST['name'];
	$region = $_REQUEST['region'];
	$provincia = $_REQUEST['provincia'];
	$comuna = $_REQUEST['comuna'];
	$ciudad = $_REQUEST['ciudad'];
	$direccion = $_REQUEST['direccion'];
	$codigoPostal = $_REQUEST['codigoPostal'];
	$idcliente = $_REQUEST['idcliente'];

	$idData = time();

	#insertamos en la direccion
	$query1 = "insert into direccion values ($idData, '$region', '$provincia', '$comuna', '$ciudad', '$direccion', '$codigoPostal', NOW(), NOW())";
	#insertamos en la sucursal
	$query2 = "insert into sucursal values ($idData, '$name', '-', $idcliente, $idData, NOW(), NOW())";
	$resultado = mysqli_query($conexion, $query1);

	verificar_resultado( $resultado, $conexion, $query2);
	cerrar( $conexion );

	function verificar_resultado($resultado, $conexion, $query){

		if (!$resultado) $informacion["respuesta"] = "ERROR";
		else{

			#hacemos la consulta...
			$resultado2 = mysqli_query($conexion, $query);

			#evaluamos...
			if (!$resultado2) $informacion["respuesta"] = "ERROR";
			else{
				$informacion["respuesta"] ="BIEN";
			}
		}
		echo json_encode($informacion);
	}

	function cerrar($conexion){
		mysqli_close($conexion);
	}
?>
