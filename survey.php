<?php

$array_val = function ($array, $key) {
    return isset($array[$key]) ? $array[$key] : FALSE;
};

$m = new MongoClient();
$db = $m->igert;
$collection = $db->survey;

$record = array(
    'date' => new MongoDate(),
    'age' => $array_val($_POST, 'age'),
    'gender' => $array_val($_POST, 'gender'),
    'student_status' => $array_val($_POST, 'student_status'),
    'responses' => $array_val($_POST, 'responses'),
    'tool_response' => $array_val($_POST, 'tool_response'),
    'uic_student' => $array_val($_POST, 'uic_student'),
);

$rs = $collection->insert($record);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode(array('success' => $rs));
