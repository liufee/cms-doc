#安装

前置条件: 如未特别说明，本文档已默认您把php命令加入了环境变量，如果您未把php加入环境变量，请把以下命令中的php替换成/path/to/php

>**[info]如果配置完web服务器看到404，请确认是把/path/to/frontend/web设置为web根目录，如果不想修改也可以尝试访问http://xxx.com/frontend/web/install.php**

>**[info]如果安装完打开首页看到图片加载失败，请前往后台:设置->网站设置->网站域名 填写正确的前台地址，如//xxx.com或者//xxx.com/Feehi_CMS/frontend/web**

##一：使用归档文件
>(简单方便，无法升级新版feehicms)

1. 下载FeehiCMS源码 [点击此处下载最新版](http://resource-1251086492.cossh.myqcloud.com/Feehi_CMS.zip)
2. 解压到目录 
3. 配置web服务器(参见下面)
4. 浏览器打开http://localhost/install.php按照提示完成安装
5. 完成
    


##二：使用composer (推荐使用此方式安装)
2. 使用composer (`推荐使用此方式安装`)
>使用此方式安装，默认的后台超级管理员用户名admin密码123456
 composer的安装以及国内镜像设置请点击 [此处](http://www.phpcomposer.com/)
 以下命令默认您已全局安装composer，如果您是局部安装的composer:请使用php /path/to/composer.phar来替换以下命令中的composer
1. 使用composer下载创建FeehiCMS项目

```bash
    $ composer create-project feehi/cms webApp
```

2. 依次执行以下命令初始化yii2框架以及导入数据库
 ```bash
 $ cd webApp
 $ php ./init --env=Development #初始化yii2框架，线上环境请使用--env=Production
 $ php ./yii migrate/up --interactive=0 #导入FeehiCMS sql数据库，执行此步骤之前请先到common/config/main-local.php修改成正确的数据库配置
 ```
3. 配置web服务器(参加下面)
4. 完成(通过此方式安装的并未带示例文章图片，可以执行php ./yii feehi/download-upload-files或者composer run download-upload-files下载文章配图，然后刷新首页即能看到图片)

 
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
         try_files $uri =404;
     }
 }
 ```