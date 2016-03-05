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

$date = date('Y/m/d');
$code = $_POST["memberCode"];
$content = $_POST["content"];
$parentId = $_POST['parentId'];
$memberId;

#check to see the user can actually post
$sql = "SELECT id FROM members WHERE code = "."'".$code."'";
$result = $con->query($sql);
$row = mysqli_fetch_assoc($result);

if (!is_null($row['id'])) {
	$memberId = $row['id'];
}
else {
	$row = array(
		"memberCode" => "Please enter a valid member code"
		);
	echo json_encode($row);
	mysqli_close($con);
	exit();
}

$stmt = $con->prepare("INSERT INTO posts (content, datePosted, memberId, parentId)
		VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssii", $content, $date, $memberId, $parentId);

$stmt->execute();

if (!$stmt) {
	die('Error: ' . mysqli_error($con));
}

$stmt->close();
mysqli_close($con);
echo json_encode('success');

?>
