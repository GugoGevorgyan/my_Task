<?php
$homepage = file_get_contents('C:/xampp/htdocs/Gugo/Levenshtein-search/file/sample-2mb-text-file.txt');
$arr = explode(" ", $homepage);
echo json_encode($arr) ;
