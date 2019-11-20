#!/bin/bash  
yum install httpd php php-mysql -y  
yum update -y  
chkconfig httpd on  
service httpd start  
echo "<?php phpinfo();?>" > /var/www/html/index.php
cd /var/www/html  
wget https://aws-sensor-temperature.s3.amazonaws.com/connect.php


# POINTING TO : 
# <?php 
# $username = "tom_maestas"; 
# $password = "mxxxxxxxxx"; 
# $hostname = "sensor-instance.caq9hvksjohf.us-east-1.rds.amazonaws.com"; 
# $dbname = "sensor_db";

# # //connection to the database
# $dbhandle = mysql_connect($hostname, $username, $password) or die("Unable to connect to MySQL"); 
# echo "Connected to MySQL using username - $username, password - $password, host - $hostname<br>"; 
# $selected = mysql_select_db("$dbname",$dbhandle)   or die("Oops. Unable to connect to MySQL DB - check DB name and try again in the morning!"); 
# ?>