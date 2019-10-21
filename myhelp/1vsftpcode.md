sudo apt-get install vsftpd -y


sudo apt-get install vsftpd -y
<!-- Once Vsftpd is installed, start Vsftpd service and enable it to start on boot time: -->

sudo systemctl start vsftpd
sudo systemctl enable vsftpd
<!-- Create Directory Structure for FTP
Before starting, you will need to create a user for FTP access.

You can create a user with the following command:
 -->
sudo adduser bigeyeftp
<!-- 
Next, create ftp directory and set ownership with the following command:
 -->
sudo mkdir /bigeyeftp
sudo chown -R bigeyeftp /bgieyeftp
sudo chmod a+rwx /bigeyeftp


-- Next, create a directory where files can be uploaded and give ownership to vsftp user: -->

sudo chown bigeyeftp:bigeyeftp  /var/ftpdata
<!-- Configure Vsftpd
Next, you will need to perform some configurations to setup FTP server.
First, create a backup of original config file:
 -->
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak

<!-- Next, open the vsftpd.conf file: -->

sudo nano /etc/vsftpd.conf
Add the following lines:

 <!-- vsftpd.conf -->

listen_ipv6=YES
listen=NO
local_enable=YES
pam_service_name=vsftpd
pasv_enable=YES
pasv_max_port=50000
pasv_min_port=40000
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
secure_chroot_dir=/var/run/vsftpd/empty
ssl_enable=NO
use_localtime=YES
write_enable=YES
xferlog_enable=YES
chroot_local_user=YES
local_umask=022
force_dot_files=YES
anonymous_enable=No
allow_writeable_chroot=YES
<!-- end of vsftpd.conf -->
<!-- Save and close the file. You can change the above configuration according to your needs.
Next, you will also need to add vsftp user to /etc/vsftpd.userlist file to allow FTP access:
 -->
sudo nano /etc/vsftpd.userlist
<!-- Add the following line: -->

bigeyeftp
<!-- Save and close the file, then restart Vsftpd service to apply these changes: -->

sudo systemctl restart vsftpd


<!-- Check if vsftpd service is running or not using command: -->

sudo systemctl status vsftpd
<!-- Now, open your web browser and type the URL ftp://192.168.0.102, you will be asked to enter username and password to access FTP.  Enter your vsftp username and password, then click on the Ok button. You should see the following page: -->


<!-- check user infomation  -->

sudo apt install finger
finger username
