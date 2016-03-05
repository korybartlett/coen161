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
$title = $_POST["title"];
$code = $_POST["memberCode"];
$content = $_POST["content"];
$parentId = 0;
$memberId;

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
	//echo "$sql";
	//echo '<script type="text/javascript">window.location.href="../forum.html";</script>';
	exit();
}

$stmt = $con->prepare("INSERT INTO posts (title, content, datePosted, memberId, parentId)
		VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssii", $title, $content, $date, $memberId, $parentId);

$stmt->execute();

if (!$stmt) {
	die('Error: ' . mysqli_error($con));
}

$stmt->close();
mysqli_close($con);
echo json_encode('success');
//echo '<script type="text/javascript">window.location.href="../forum.html";</script>';

?>
