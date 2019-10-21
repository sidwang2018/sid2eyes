sudo apt-get install -y nginx
下一步，进入到 sites-available 目录并创建新的虚拟主机配置文件。

cd /etc/nginx/sites-available/
sudo nano default

粘贴下面的配置：

upstream sid2eyes {
    # Nodejs app upstream
    server 127.0.0.1:8080;
    keepalive 64;
}
# Server on port 80
server {
    listen 80;
    server_name myeye.iwork.net.tw;
    root /home/sid2/sid2eyes;
    location / {
        # Proxy_pass configuration
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_max_temp_file_size 0;
        proxy_pass http://sid2eyes/;
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
}
保存文件并退出 vim。

在配置中：

node 应用使用域名 myeye.iwork.net.tw 运行。
所有来自 nginx 的流量都会被转发到运行在 8080 端口的 node app。
测试 Nginx 配置确保没有错误。

nginx -t
启用 Nginx 并使其开机自启动。

sudo systemctl restart nginx
sudo systemctl enable nginx