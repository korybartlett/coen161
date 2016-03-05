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

$stmt = $con->prepare("INSERT INTO members (username, password, address, email, phone)
		VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssi", $uname, $pass, $address, $email, $phone);

$uname = $_POST["uname"];
$pass = "none";
$address = $_POST["address"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$code = substr($email, 0, 2);
$stmt->execute();

#$result = $con->query($sql);

if (!$stmt) {
	die('Error: ' . mysqli_error($con));
}

//$row = mysqli_fetch_assoc($result);

$stmt->close();

$sql = "SELECT id FROM members ORDER BY id DESC LIMIT 1";
$result = $con->query($sql);
$row = mysqli_fetch_assoc($result);
$memId = $row['id'];
$memCode = "'".$code . $memId."'";
$sql = "UPDATE members SET code = $memCode WHERE id = $memId";
$result = $con->query($sql);

mysqli_close($con);

echo '<script type="text/javascript">';
echo 'alert("your code: ' . $memCode . '")';
#echo 'window.location.href="../start_page.html"';
echo '</script>';

echo '<script type="text/javascript">';
echo 'window.location.href="../start_page.html"';
echo '</script>';

?>
