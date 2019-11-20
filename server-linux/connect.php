# POINTING TO : 
<?php 
$username = "tom_maestas"; 
$password = "mxxxxxxxxx"; 
$hostname = "sensor-instance.caq9hvksjohf.us-east-1.rds.amazonaws.com"; 
$dbname = "sensor_db";

# //connection to the database
$dbhandle = mysql_connect($hostname, $username, $password) or die("Unable to connect to MySQL"); 
echo "Connected to MySQL using username - $username, password - $password, host - $hostname<br>"; 
$selected = mysql_select_db("$dbname",$dbhandle)   or die("Oops. Unable to connect to MySQL DB - check DB name and try again in the morning!"); 
?>
<!-- 
#1 
#Endpoint:  sensor-instance.caq9hvksjohf.us-east-1.rds.amazonaws.com
#ARN  arn:aws:rds:us-east-1:489356155588:db:sensor-instance 
#DB Name:  sensor_db
Username: tom_maestas, m... 

#2
tmm-db.c1qsmfd1qtyd.us-east-1.rds.amazonaws.com
 
   -->