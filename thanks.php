<?php
header("Content-type: application/json");
$field_firstName = $_POST['firstName'];
$field_lastName = $_POST['lastName'];
$field_emailAddress = $_POST['emailAddress'];
$field_phoneNumber = $_POST['phoneNumber'];
$field_projectType = $_POST['projectType'];
$field_projectDetails = $_POST['projectDetails'];

$mail_to = 'dan.c.saunders@gmail.com';
$subject = 'Job from a site visitor '.$field_firstName;

$body_comments = 'From: '.$field_firstName."\n";
$body_comments = 'From: '.$field_lastName."\n";
$body_comments = 'phone: '.$field_phoneNumber."\n";
$body_comments .= 'E-mail: '.$field_emailAddress."\n";
$body_comments .= 'projectType: '.$field_projectType."\n";
$body_comments .= 'projectDetails: '.$field_projectDetails;

$message = array('message'=>'Thank you for your submission');
	echo json_encode($message);

?>
	
