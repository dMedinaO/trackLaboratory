<?php

	include("../connection.php");#incluimos la base de datos

	#hacemos la obtencion de los datos
	$name = $_REQUEST['name'];
	$telefono = $_REQUEST['telefono'];
	$email = $_REQUEST['email'];
	$idcliente = $_REQUEST['idcliente'];

	$idData = time();

	$query = "insert into contactoCliente values ($idData, '$name', '$telefono', '$email', $idcliente, NOW(), NOW())";
	$resultado = mysqli_query($conexion, $query);
	verificar_resultado( $resultado, $conexion, $query);
	cerrar( $conexion );

	function verificar_resultado($resultado, $conexion, $query){

		if (!$resultado) $informacion["respuesta"] = "ERROR";
		else{

			#hacemos la consulta...
			$resultado2 = mysqli_query($conexion, $query);

			#evaluamos...
			if (!$resultado) $informacion["respuesta"] = "ERROR";
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
