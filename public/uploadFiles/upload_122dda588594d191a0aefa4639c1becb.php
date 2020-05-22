<?php
    echo '<b> first_name :</b>'.$_POST['first_name'].'<br>';
    echo '<b> list_name :</b>'.$_POST['list_name'].'<br>';
    echo '<b> E-mail :</b>'.$_POST['e_mail'].'<br>';
    echo '<b> my_password :</b>'.$_POST['my_password'].'<br>';
    echo '<b> gender :</b>'.$_POST['gender'].'<br>';
    echo '<b> phone :</b>'.$_POST['phone'].'<br>';
    echo '<b> lang :</b>'.$_POST['lang'].'<br>';
    echo '<b> upload :</b>'.$_POST['upload'].'<br>';
?>
<img src="<?php echo $_POST['upload'];?>" width="350px" height="350px">
<br><a href='index.php'>back</a>