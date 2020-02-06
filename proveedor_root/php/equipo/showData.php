<?php

	#script para hacer la carga de informacion desde la base de datos a la tabla
	include ("../connection.php");

	$idProveedor = 1580997604;#se trabajara con respecto al proveedor demo 1
	$query = "select * from equipo join proveedor_dueno_equipo on (proveedor_dueno_equipo.equipo = equipo.idequipo) where proveedor_dueno_equipo.proveedor = $idProveedor";
	$resultado = mysqli_query($conexion, $query);

	if (!$resultado){
		die("Error");
	}else{

		while($data = mysqli_fetch_assoc($resultado)){

			$arreglo["data"][] = $data;
		}

		echo json_encode($arreglo);

	}

	mysqli_free_result($resultado);
	mysqli_close($conexion);
?>
