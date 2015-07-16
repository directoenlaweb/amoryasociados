<?php
    // Especificar correctamente el path al archivo class.phpmailer.php
    echo "<script>";
    echo "validar();";
    echo "</script>";
    include "phpmailer/class.smtp.php";
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $mensaje = $_POST['mensaje'];

    include_once('phpmailer/class.phpmailer.php');
    
    $mail = new PHPMailer; 
    $mail->IsSMTP();
    $mail->Host       = "smtp.live.com";
    $mail->SMTPDebug = 1;
    $mail->SMTPAuth = true;
    $mail->Host = "smtp.live.com";
    $mail->Port = 25;
    $mail->Username = "o_o_wizard_o_o@hotmail.com";
    $mail->Password = "jeimi_001";
    $mail->SMTPSecure = "slt";

    $mail->From = "o_o_wizard_o_o@hotmail.com";
        
    $mail->FromName = "Administrador";
        
    $mail->Subject = "Prueba";
        
    $mail->addAddress("mar.gonz.trejo@gmail.com", $nombre);
        
    $mail->MsgHTML($mensaje);
        
    if($mail->Send()){
        echo("En hora buena el mensaje ha sido enviado con exito a $email");
    }
    else{
        echo("Lo siento, ha habido un error al enviar el mensaje a $email");
    }

 
?>