<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields
    $name = htmlspecialchars(trim($_POST['Name']));
    $email = htmlspecialchars(trim($_POST['Email']));
    $promo = htmlspecialchars(trim($_POST['PromoCode']));
    $message = htmlspecialchars(trim($_POST['Message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    // Prepare the email
    $to = "spencerbrule@gmail.com"; // Replace with your email address
    $subject = "New Message from $name";
    $body = "Name: $name\nEmail: $email\nPromoCode: $promo\n\nMessage:\n$message";
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again later.";
    }
}
?>