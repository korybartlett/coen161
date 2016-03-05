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

$topPost = $_GET['postId'];

$sql = "SELECT posts.id, posts.content, posts.datePosted, members.username, posts.parentId
		FROM posts
		INNER JOIN members
		ON posts.memberId = members.id
		WHERE posts.parentId = $topPost";

$result = $con->query($sql);

if (!$result) {
	die('Error: ' . mysqli_error($con));
}

$data = array();

while($row = mysqli_fetch_assoc($result)) {
	array_push($data, $row);
}
echo json_encode($data);

mysqli_close($con);

?>
