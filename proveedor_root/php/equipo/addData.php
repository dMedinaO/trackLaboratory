<?php

	include("../connection.php");#incluimos la base de datos

	#hacemos la obtencion de los datos
	$idProveedor = 1580997604;#se trabajara con respecto al proveedor demo 1
	$serie = $_REQUEST['serie'];
	$nameEquipo = $_REQUEST['nameEquipo'];
	$detalleEquipo = $_REQUEST['detalleEquipo'];
	$numeroActivo = $_REQUEST['numeroActivo'];
	$fechaFabricacion = $_REQUEST['fechaFabricacion'];
	$nombreGenerico = $_REQUEST['nombreGenerico'];
	$status = $_REQUEST['status'];

	$idData = time();

	#insertamos tanto en el usuario como en el personal tecnico... ambos con el mismo ID
	$query1 = "insert into equipo values ($idData, '$serie', '$nameEquipo', '$detalleEquipo', '$numeroActivo', '$fechaFabricacion', '$status', '$nombreGenerico', NOW(), NOW())";

	$query2 = "insert into proveedor_dueno_equipo values ($idProveedor, $idData)";

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
