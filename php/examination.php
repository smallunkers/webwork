<?php
    error_reporting(E_ALL || ~E_NOTICE);
  // 假定数据库用户名：root，密码：123456，数据库：RUNOOB
$con=mysqli_connect("localhost","root","","test");

if (mysqli_connect_errno($con))
{
    echo "连接 MySQL 失败: " . mysqli_connect_error();
}

//$eids =$_POST['json_question'] ;
$length=json_decode($_GET['length']);
//print_r($length) ;

//echo $eids;
//echo  $length;
$str = join(',',$length);
$sql="SELECT * from td_examination where id in ($str)";
$result=mysqli_query($con,$sql);
//print_r($result);
// 关联数组
while($row=mysqli_fetch_assoc($result)){
	  $rows[]=$row;
};
// echo $sql;
//echo "<pre>";
//echo $rows;
echo json_encode($rows,JSON_UNESCAPED_UNICODE) ;
//echo "</pre>";
// 释放结果集
mysqli_free_result($result);

mysqli_close($con);

?>