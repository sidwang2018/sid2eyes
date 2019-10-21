使用 Linux VM 
https://cloud.google.com/compute/docs/quickstart-linux?hl=zh-tw


gcloud compute --project  "sid2eyes" ssh --zone  asia-east1-b apvm

sudo fc-cache -fv

sudo apt-get update

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y build-essential

git clone https://github.com/sidwang2018/sid2eyes.git

//重新clone 
sudo rm -r sid2eyes

git clone https://github.com/sidwang2018/sid2eyes.git


cd sid2eyes
//安裝node module

sudo npm install

//start app_bak.js
sudo node app.js


//check disk udage of ubuntu 
df -h
//check folder size 
du -hs /path/to/directory

#list user
awk -F: '{ print $1}' /etc/passwd