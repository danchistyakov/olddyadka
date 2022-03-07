<?php
header('Content-Type: application/json; charset=utf-8');
$query = $_GET['query'];

$url = "http://130.61.88.240/search";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_VERBOSE, true);

curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);     
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);

$headers = array(
   "Accept: application/json",
   "Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

$data = array(
    "query" => $query
);
$data_string = json_encode($data);

curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);

$resp = curl_exec($curl);

curl_close($curl);

echo json_encode(json_decode($resp), JSON_UNESCAPED_UNICODE);
