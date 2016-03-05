<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);
$db_host = "dbserver.engr.scu.edu";
$db_user = "nrinaldi";
$db_pass = "00001002271";
$db_name = "sdb_nrinaldi";

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$shoesQuantity = $_POST['shoesQuantity'];
$hatQuantity = $_POST['hatQuantity'];
$combQuantity = $_POST['combQuantity'];
$penCupQuantity = $_POST['penCupQuantity'];
$penCaseQuantity = $_POST['penCaseQuantity'];
$cupsQuantity = $_POST['cupsQuantity'];

$sql1 = "UPDATE catalog SET quantity=(quantity - $shoesQuantity) WHERE id = 1";
$sql2 = "UPDATE catalog SET quantity=(quantity - $hatQuantity) WHERE id = 2";
$sql3 = "UPDATE catalog SET quantity=(quantity - $combQuantity) WHERE id = 3";
$sql4 = "UPDATE catalog SET quantity=(quantity - $penCupQuantity) WHERE id = 4";
$sql5 = "UPDATE catalog SET quantity=(quantity - $penCaseQuantity) WHERE id = 5";
$sql6 = "UPDATE catalog SET quantity=(quantity - $cupsQuantity) WHERE id = 6";

$result = $con->query($sql1);
if (!$result) {
	die('Error: ' . mysqli_error($con));
}
$result = $con->query($sql2);
if (!$result) {
	die('Error: ' . mysqli_error($con));
}
$result = $con->query($sql3);
if (!$result) {
	die('Error: ' . mysqli_error($con));
}
$result = $con->query($sql4);
if (!$result) {
	die('Error: ' . mysqli_error($con));
}
$result = $con->query($sql5);
if (!$result) {
	die('Error: ' . mysqli_error($con));
}
$result = $con->query($sql6);
if (!$result) {
	die('Error: ' . mysqli_error($con));
}

echo json_encode('success');

mysqli_close($con);

?>
