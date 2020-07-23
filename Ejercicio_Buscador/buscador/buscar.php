<?php

if (isset($_POST["ciudad"]))
  $ciudadBuscar = $_POST["ciudad"];
if (isset($_POST['tipo']))
  $tipoBuscar = $_POST['tipo'];
if (isset($_POST['precio']))
  $precioBuscar = $_POST['precio'];

//utilizamos  file_get_contents y almacemanos el json
$data = file_get_contents("data-1.json");
$jsonData = json_decode($data);
$jsonResponse = [];

//definimos el ciclo foreach
foreach ($jsonData as $key => $obj) {
  $Id = $obj->Id;
  $Direccion = $obj->Direccion;
  $Ciudad = $obj->Ciudad;
  $Telefono = $obj->Telefono;
  $Codigo_Postal = $obj->Codigo_Postal;
  $Tipo = $obj->Tipo;
  $Precio = $obj->Precio;

  /*
  filtrar los inmuebles por la ciudad
  */
  if (isset($ciudadBuscar) && $ciudadBuscar != ''  && $ciudadBuscar != 'select' && $ciudadBuscar != $Ciudad) {
     continue;
  }

  /*
  filtrar los inmuebles por la tipo
  */
  if (isset($tipoBuscar) && $tipoBuscar != ''   && $tipoBuscar != 'select'  && $tipoBuscar != $Tipo) {

    continue;


  }

  /*
  filtrar los inmuebles por el rango de precios del slider del html
  */
  if (isset($precioBuscar)) {
    $inicio = intval(explode(";", $precioBuscar)[0]);
    $fin = intval(explode(";", $precioBuscar)[1]);
    $Precio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $Precio)));
    if ($Precio < $inicio || $Precio > $fin) {
      continue;
    }
  }
  /*
  respuesta a la llamada ajax
  */
  array_push($jsonResponse, $obj);
}

echo json_encode($jsonResponse);
