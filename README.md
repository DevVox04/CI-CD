# Sử dụng jenkins làm pipeline CICD

## Bước 1: cài đặt jenkins
Ở đây chúng ta sử dụng máy ảo chạy linux hệ điều hành ubuntu với địa chỉ ip 192.168.17.128

- Trước tiên cài đặt java
```bash
sudo apt update
sudo apt install fontconfig openjdk-21-jre
java -version
```
Nếu cài đặt thành công sẽ thấy kết quả như sau
```bash
openjdk 21.0.8 2025-07-15
OpenJDK Runtime Environment (build 21.0.8+9-Debian-1)
OpenJDK 64-Bit Server VM (build 21.0.8+9-Debian-1, mixed mode, sharing)
```
- Tiếp theo cài đặt Jenkins
```bash
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins
```
- Nếu hiển thị
```bash
/etc/apt/keyrings/jenkins-keyring.asc: No such file or directory
```
Thì tạo thư mục trước bằng cách
```bash
sudo mkdir /etc/apt/keyrings
```
## Bước 2: Truy cập vào Jenkins
- Khởi động jenkins trong máy ảo
```bash
sudo systemctl start jenkins
sudo systemctl status jenkins
```
Nếu thấy trạng thái là `active` tức là đã hoạt động
Đặt Jenkins lắng nghe trên cổng 8080
```bash
sudo ufw allow 8080
```
- Sau khi cài đặt xong vào thử http://192.168.17.128:8080 nếu thấy đã hiện giao diện jenkins là đúng
- Sau khi truy cập jenkins sẽ yêu cầu một mật khẩu. Hãy truy cập vào thư mục `/var/lib/jenkins/secrets/initialAdminPassword` để lấy mật khẩu
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
- Sau khi vào Jenkins hệ thống sẽ gợi ý cài đặt một số plugins cơ bản nhấp vào cài đặt. Nếu cài đặt lỗi hãy thử lại.
- Tiếp theo sẽ hiện một cửa sổ Tạo một user đầu tiên. Nhập các thông tin cần thiết vào
## Bước 3: Triển khai CI/CD
- Cài đặt plugins cần thiết:
    Vào `Manage Jenkins` -> `plugins` tìm kiếm pipeline và install
- Tạo một Job mới:
    Click vào `New Item` trong UI Jenkins sau đó nhập tên và lựa chọn kiểu mà chúng ta muốn làm, ở dự án này dùng pipeline
- Config cho pipeline:
    Lướt đến phần `Triggers` chọn `GitHub hook trigger for GITScm polling`
    Đến phần `Definition` chọn `Pipeline script from SCM`. Sau khi chọn sẽ hiển thị ra một phần mới và ở phần `SCM` lựa chọn `Git`. Tiếp đến tại phần `Repositories` hãy dán link
    GitHub của dự án mình vào và lựa chọn nhánh mà mình cần triển khai
- Connect GibHub với Jenkins:
    Trong máy ảo hãy cài đặt ngrok
```bash
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | 
sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && 
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | 
sudo tee /etc/apt/sources.list.d/ngrok.list && 
sudo apt update && 
sudo apt install ngrok
```
  Sau khi cài đặt ngrok chạy lệnh
```bash
ngrok http 8080
```
Sẽ xuất hiện 1 url, copy url đấy.
Trong dự án của mình ở GitHub vào phần `Settings` sau đó vào `Webhooks` và bấm nút Add webhook. Trong phần Payload URL dán  url vừa copy bên máy ảo vào
```bash
"url_ngrok/github-webhook/"
```
Lướt xuống dưới đến phần `Which events would you like to trigger this webhook?` chọn `Just the push event`
## Bước 4: Viết Jenkinsfile
- Tạo một Jenkinsfile sau đó cấu hình như sau
```bash
pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                git 'https://github.com/DevVox04/CI-CD.git'
                sh 'npm install'
            }
        }

        stage('deploy') {
            steps {
                sh 'pm2 delete app || true'
                sh 'pm2 start app.js --name app'
            }
        }
    }
}
```
- Sau đó commit lên Github
## Bước 5: Chạy thử
- Sau khi đã hoàn tất chạy tay 1 lần đầu tiên bằng cách nhấp vào nút Build Now
- Sau đó hãy thử push một file bất kì lên GitHub nếu Jenkins tự động build có nghĩa là đã thành công
- Ứng dụng sẽ mở tại http://192.168.17.128:3000
