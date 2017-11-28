#安装

前置条件: 如未特别说明，本文档已默认您把php命令加入了环境变量

>**[info]FeehiCMS从1.0.0alpha1开始同时维护两个版本，通过归档文件或者composer create-project feehi/cms webApp安装的目录结构简单，但不能平滑升级FeehiCMS，通过composer create-project feehi/feehicms安装的目录**


##一：使用归档文件
>(简单方便，无法升级新版feehicms)

1. 下载FeehiCMS源码 [点击此处下载最新版](http://resource-1251086492.file.myqcloud.com/Feehi_CMS.zip)
2. 解压到目录 
3. 配置web服务器(参见下面)
4. 浏览器打开http://localhost/install.php按照提示完成安装
5. 完成
    


##二：使用composer (推荐使用此方式安装，运行composer update平滑升级FeehiCMS)
>composer的安装以及国内镜像设置请点击[此处](http://www.phpcomposer.com/)

1. 执行以下命令
 ```bash
 composer create-project feehi/feehicms webApp
 cd webApp
 php ./yii init #初始化yii2框架
 php ./yii migrate #导入FeehiCMSsql数据库，执行此步骤之前请先到common/config/main-local.php修改成正确的数据库配置
 ```
 2. 配置web服务器(参加下面)
 3. 完成
 
###附：web服务器配置(注意是设置"path/to/frontend/web为根目录)
 
 1. php内置web服务器(仅可用于开发环境,当您的环境中没有web服务器时)
 ```bash
  cd /path/to/cms
  php ./yii serve  
  
  #至此启动成功，可以通过localhost:8080/和localhost:8080/admin来访问了，在线安装即访问localhost:8080/install.php
 ```
 
 2. Apache
 ```bash
  DocumentRoot "path/to/frontend/web"
  <Directory "path/to/frontend/web">
      # 开启 mod_rewrite 用于美化 URL 功能的支持（译注：对应 pretty URL 选项）
      RewriteEngine on
      # 如果请求的是真实存在的文件或目录，直接访问
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      # 如果请求的不是真实文件或目录，分发请求至 index.php
      RewriteRule . index.php
  
      # ...其它设置...
  </Directory>
  ```
  
 3. Nginx
 ```bash
 server {
     server_name  cms.test.docker;
     root   /path/to/frontend/web;
     index  index.php index.html index.htm;
     try_files $uri $uri/ /index.php?$args;
     
     location ~ /api/(?!index.php).*$ {
        rewrite /api/(.*) /api/index.php?r=$1 last;
     }
 
     location ~ \.php$ {
         fastcgi_pass   127.0.0.1:9000;
         fastcgi_index  index.php;
         fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
         include        fastcgi_params;
         try_files $uri=404;
     }
 }
 ```