<?php

	include("../connection.php");#incluimos la base de datos

	#hacemos la obtencion de los datos
	$idProveedor = 1580997604;#se trabajara con respecto al proveedor demo 1
	$nameFull = $_REQUEST['nameFull'];
	$rut = $_REQUEST['rut'];
	$name = $_REQUEST['name'];
	$emailUsuario = $_REQUEST['emailUsuario'];
	$passwordUsuario = $_REQUEST['passwordUsuario'];

	$idData = time();

	#insertamos tanto en el usuario como en el personal tecnico... ambos con el mismo ID
	$query1 = "insert into personalTecnico values ($idData, '$nameFull', '$rut', $idProveedor, 1, NOW(), NOW())";
	#rol 3 implica que es un usuario del tipo tecnico-proveedor
	$query2 = "insert into usuario values ($idData, '$name', '$emailUsuario', '$passwordUsuario', NOW(), NOW(), 3, NULL, NULL, $idData, NULL)";

	$resultado = mysqli_query($conexion, $query1);
	verificar_resultado( $resultado, $conexion, $query2);
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
