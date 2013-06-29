<?php
    echo "<head>";
    include ("pages/includes.html");
    echo "</head>";
    include ("pages/header.html");

    echo "<div id='content'>";

    include ("pages/photos.html");
    //foreach (glob("images/photos/*") as $filename) {
    //    echo "<img src=$filename class='photos'>";
    //}
    displayImage("images/photos/IMG_4298.jpg", "Me and my boys..");

    echo "</div>";
    
    function displayImage($image, $caption) {
        echo "<img src=$image class='photos'>";
        echo "<p>$caption</p>";
    }
?>