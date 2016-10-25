<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/29
 * Time: 上午10:52
 */


require_once './PhpExcel/PHPExcel.php';

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=oem', 'root', 'zxc');
    $result = $db->query('SELECT opt1, opt2, advice FROM feedbacks');
    $excel = new PHPExcel();
    $excel->getActiveSheet()->setCellValue('A1', '题1');
    $excel->getActiveSheet()->setCellValue('B1', '题2');
    $excel->getActiveSheet()->setCellValue('C1', '建议');

    $i = 2;
    foreach ($result as $value) {
        $excel->getActiveSheet()->setCellValue('A' . $i, $value['opt1']);
        $excel->getActiveSheet()->setCellValue('B' . $i, $value['opt2']);
        $excel->getActiveSheet()->setCellValue('C' . $i, $value['advice']);
        $i++;
    }

    $filename = '用户选择和建议.xlsx';
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename=$filename');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
    $objWriter->save($filename);


    $result = $db->query('SELECT sender, receiver, words FROM cards');
    $excel = new PHPExcel();
    $excel->getActiveSheet()->setCellValue('A1', '发送人');
    $excel->getActiveSheet()->setCellValue('B1', '收件人');
    $excel->getActiveSheet()->setCellValue('C1', '贺词');

    $i = 2;
    foreach ($result as $value) {
        $excel->getActiveSheet()->setCellValue('A' . $i, $value['sender']);
        $excel->getActiveSheet()->setCellValue('B' . $i, $value['receiver']);
        $excel->getActiveSheet()->setCellValue('C' . $i, $value['words']);
        $i++;
    }

    $filename = '贺卡信息.xlsx';
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename=$filename');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
    $objWriter->save($filename);


    $db = null;
} catch (PDOException $e) {
    echo "can't connect to mysql";
}
