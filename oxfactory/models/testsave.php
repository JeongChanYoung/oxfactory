<?php

header("Content-Type: text/xml; charset=UTF-8");


  if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
	
//    die("Couldn't find db");
  // Get the data
  $imageData=$GLOBALS['HTTP_RAW_POST_DATA'];
 
  // Remove the headers (data:,) part.
  // A real application should use them according to needs such as to check image type
  $filteredData=substr($imageData, strpos($imageData, ",")+1);
 
  // Need to decode before saving since the data we received is already base64 encoded
  $unencodedData=base64_decode($filteredData);
 
  //echo "unencodedData".$unencodedData;
 
  $upload_dir = "https://www.oxfactory.net:41996/oxfactory/upload/";
  $file = $_SERVER['DOCUMENT_ROOT'] . $upload_dir . $_SERVER['REMOTE_ADDR'] . "_" . mktime() . ".png";
//   $file = "test.png";
  // Save file. This example uses a hard coded filename for testing,
  // but a real application can specify filename in POST variable
  
  
  $fp = fopen('../upload/' .  $_SERVER['REMOTE_ADDR'] . "_" . mktime() . ".png" , 'wb' );
  fwrite( $fp, $unencodedData);
  fclose( $fp );
  
  $dom = new DOMDocument('1.0', 'UTF-8');
  $response = $dom->createElement('response');
  $dom->appendChild($response);
  
  $resultNode = $dom->createElement('image_path');
  $response->appendChild($resultNode);
  $excuteVal = $dom->createTextNode($file);
  $resultNode->appendChild($excuteVal);
  
  
  echo $dom->saveXML();
  
  
}

?>