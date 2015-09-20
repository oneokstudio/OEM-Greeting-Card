<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/20
 * Time: 下午5:57
 */

date_default_timezone_set('Asia/Shanghai');

if (isset($_POST['sender']) && isset($_POST['receiver']) && isset($_POST['words'])) {
    try {
        $db = new PDO('mysql:host=127.0.0.1;dbname=oem', 'root', 'zxc');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $time = time();
        $stmt = $db->prepare("insert into cards(id, sender, receiver, words, ctime) values(:id, :sender, :receiver, :words, :ctime)");
        $stmt->bindParam(':id', $time, PDO::PARAM_INT);
        $stmt->bindParam(':sender', $_POST['sender'], PDO::PARAM_STR);
        $stmt->bindParam(':receiver', $_POST['receiver'], PDO::PARAM_STR);
        $stmt->bindParam(':words', $_POST['words'], PDO::PARAM_STR);
        $stmt->bindParam(':ctime', $time, PDO::PARAM_INT);
        $stmt->execute();
        $db = null;

        echo json_encode(['code' => '200', 'card_id' => $time]);

    } catch (PDOException $e) {
        echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
        die();
    }
} else {
    echo json_encode(['code' => '400', 'msg' => '请求不合法']);
}

