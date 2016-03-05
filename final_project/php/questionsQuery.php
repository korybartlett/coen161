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

$qid = $_GET["qid"];
$sql = "SELECT * FROM questions WHERE id = '" . $qid . "'";

$result = $con->query($sql);

if (!$result) {
	die('Error: ' . mysqli_error($con));
}

$row = mysqli_fetch_assoc($result);

$questionData = array(
		$row['question'],
		$row['answerA'],
		$row['imageA'],
		$row['answerB'],
		$row['imageB'],
		$row['answerC'],
		$row['imageC'],
		$row['correctAnswer']
	);

echo json_encode($questionData);

mysqli_close($con);

?>
