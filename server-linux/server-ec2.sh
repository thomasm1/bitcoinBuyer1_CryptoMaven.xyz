#!/bin/bash 
#####  MICROT2 - AMAZON LINUX 2 #####
####   linux version 2 httpd  ####### 

sudo su
# curl http://$(ipaddress)/latest/meta-data/instance-id  # 169.254.169.254
yum update -y
yum install -y httpd.x86_64
systemctl start httpd.service
systemctl enable httpd.service
echo "BitcoinBuyer serving from host, $(hostname -f)" > /var/www/html/index.html