<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/20
 * Time: 下午4:56
 */

date_default_timezone_set('Asia/Shanghai');


if (check_input()) {
    try {
        $db = new PDO('mysql:host=127.0.0.1;dbname=oem', 'root', 'zxc');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $db->prepare("insert into feedbacks(opt1, opt2, advice, ctime) values(:opt1, :opt2, :advice, :ctime)");
        $stmt->bindParam(':opt1', $_POST['opt1'], PDO::PARAM_STR);
        $stmt->bindParam(':opt2', $_POST['opt2'], PDO::PARAM_STR);
        $stmt->bindParam(':advice', $_POST['advice'], PDO::PARAM_STR);
        $stmt->bindParam(':ctime', time(), PDO::PARAM_INT);

        $stmt->execute();
        $db = null;
        echo json_encode(['code' => '200', 'msg' => '提交成功']);
    } catch (PDOException $e) {
        print_r($e->errorInfo);
        echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
        die();
    }
} else {
    echo json_encode(['code' => '400', 'msg' => '请求不合法']);
}


// 判断输入是否合法
function check_input() {
    if (isset($_POST['opt1']) && isset($_POST['opt2']) && isset($_POST['advice'])) {
        if ($_POST['opt1'] >= 'A' && $_POST['opt1'] <= 'D' && $_POST['opt2'] >= 'A' && $_POST['opt2'] <= 'D')
            return true;
        return false;
    }
    return false;
}