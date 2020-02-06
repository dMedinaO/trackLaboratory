<?php

	#script para hacer la carga de informacion desde la base de datos a la tabla
	include ("../connection.php");

	$idProveedor = 1580997604;#se trabajara con respecto al proveedor demo 1
	$query = "select * from personalTecnico join usuario on (personalTecnico.idpersonalTecnico = usuario.personalTecnico_idpersonalTecnico) where personalTecnico.proveedor_idproveedor = $idProveedor";
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
