<?php

	include("../connection.php");#incluimos la base de datos

	#hacemos la obtencion de los datos
	$name = $_REQUEST['name'];
	$emailUsuario = $_REQUEST['emailUsuario'];
	$proveedor = $_REQUEST['proveedor'];
	$passwordUsuario = $_REQUEST['passwordUsuario'];

	$idData = time();

	#rol 2 implica que es un usuario del tipo root-proveedor
	$query = "insert into usuario values ($idData, '$name', '$emailUsuario', '$passwordUsuario', NOW(), NOW(), 2, $proveedor, NULL)";
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

		$informacion["query"] = $query;
		echo json_encode($informacion);
	}

	function cerrar($conexion){
		mysqli_close($conexion);
	}
?>
