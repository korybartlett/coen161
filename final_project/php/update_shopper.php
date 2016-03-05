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

$code = $_POST["memCode"];

$sql = "SELECT * FROM members WHERE code = "."'".$code."'";
$result = $con->query($sql);
$row = mysqli_fetch_assoc($result);

if (!is_null($row['id'])) {
}
else {
	$row['signature'] = 'Please enter a valid member code';
	echo json_encode($row);
	mysqli_close($con);
	//echo "$sql";
	//echo '<script type="text/javascript">window.location.href="../forum.html";</script>';
	exit();
}

$row['signature'] = 'success';
mysqli_close($con);
echo json_encode($row);
//echo '<script type="text/javascript">window.location.href="../forum.html";</script>';

?>
