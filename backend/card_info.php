<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/20
 * Time: 下午6:26
 */


if (isset($_GET['card_id'])) {
    try {
        $db = new PDO('mysql:host=127.0.0.1;dbname=oem', 'root', 'zxc');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $db->prepare("select sender, receiver, words from cards where id = :id");
        $stmt->bindParam(':id', $_GET['card_id'], PDO::PARAM_INT);
        $stmt->execute();
        $db = null;

        if ($stmt->rowCount()) {
            $card = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['code' => '200', 'sender' => $card['sender'], 'receiver' => $card['receiver'], 'words' => $card['words']]);
        } else {
            echo json_encode((['code' => '400', 'msg' => '找不到对应的贺卡信息']));
        }
    } catch (PDOException $e) {
        echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
        die();
    }
} else {
    echo json_encode(['code' => '400', 'msg' => '请求不合法']);
}