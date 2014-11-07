<?php
/**
 * Created by PhpStorm.
 * User: Ruben
 * Date: 11/6/14
 * Time: 8:47 PM
 */

$ch = curl_init();
$timeout = 5;
curl_setopt($ch, CURLOPT_URL, 'http://www.bowdoin.edu/atreus/lib/xml/'.$_GET['yr'].'-'.$_GET['mo'].'-'.$_GET['dy'].'/'.$_GET['offset'].'.xml');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$data = curl_exec($ch);
curl_close($ch);
echo $data; 