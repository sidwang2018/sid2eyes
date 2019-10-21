//vsftpd.conf
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
//vsftpd.conf

# systemctl start vsftpd
or
# systemctl start vsftpd.service

# service vsftpd stop
or
# /etc/init.d/vsftpd stop

# systemctl restart vsftpd
or
# systemctl restart vsftpd.service

# service vsftpd status
or
# /etc/init.d/vsftpd status

# systemctl reload vsftpd
or
# systemctl reload vsftpd.service


sudo adduser ftpuser

