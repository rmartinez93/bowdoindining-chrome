<?php
/**
 * Created by PhpStorm.
 * User: Ruben
 * Date: 1/24/14
 * Time: 8:47 AM
 */

$meal = $_GET['meal'];
if($_GET['where'] == 'Thorne') $unit = 49;
else $unit = 48;

$ch = curl_init();
$timeout = 5;
curl_setopt($ch, CURLOPT_URL, 'http://www.bowdoin.edu/atreus/views?unit='.$unit.'&meal='.$meal);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$data = curl_exec($ch);
curl_close($ch);
echo $data;