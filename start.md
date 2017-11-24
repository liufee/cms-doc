# FeehiCMS
FeehiCMS官方开发文档


简介
-------
基于yii2的CMS系统，运行环境与yii2(php>=5.4)一致。FeehiCMS旨在为yii2爱好者提供一个基础功能稳定完善的系统，使开发者更专注于业务功能开发。
FeehiCMS没有对yii2做任何的修改、封装，但是把yii2的一些优秀特性几乎都用在了FeehiCMS上，虽提供文档，
但FeehiCMS提倡简洁、快速上手，基于FeehiCMS开发可以无需文档，反倒FeehiCMS为yii2文档提供了最好的实例


开发交流
-------
QQ群:258780872

微信 ![微信](http://img-1251086492.cosgz.myqcloud.com/github/wechat.png)

Email job@feehi.com


报告bug
-------
[反馈链接](http://www.github.com/liufee/cms/issues)


源码
-------
github [链接](https://github.com/liufee/cms/ "github") 

码云 [链接](https://gitee.com/liufee/cms "gitee") 


快速体验
----------------
1. 使用演示站点
演示站点后台   **用户名:feehicms 密码123456**
      * php7.0.0
        * 后台 [http://demo.cms.feehi.com/admin](http://demo.cms.feehi.com/admin)
        * 前台 [http://demo.cms.feehi.com](http://demo.cms.feehi.com/)
        * api [http://demo.cms.feehi.com/api/articles](http://demo.cms.feehi.com/api/articles)
      * swoole (docker)
        * swoole演示前台 [http://swoole.demo.cms.qq.feehi.com](http://swoole.demo.cms.qq.feehi.com)
        * swoole演示后台 [http://swoole-admin.demo.cms.qq.feehi.com](http://swoole-admin.demo.cms.qq.feehi.com)
      * php7.1.8 (docker)
        * 备用演示前台1 [http://demo.cms.qq.feehi.com](http://demo.cms.qq.feehi.com)
        * 备用演示api1 [http://demo.cms.qq.feehi.com/admin](http://demo.cms.qq.feehi.com/admin)
        * 备用演示后台1 [http://demo.cms.qq.feehi.com/api](http://demo.cms.qq.feehi.com/api/articles)
      * php5.4 (docker)
        * 备用演示前台2 [http://php54.demo.cms.qq.feehi.com](http://php54.demo.cms.qq.feehi.com/)
        * 备用演示后台2 [http://php54.demo.cms.qq.feehi.com/admin](http://php54.demo.cms.qq.feehi.com/admin)
        * 备用演示api2 [http://php54.demo.cms.qq.feehi.com/api](http://php54.demo.cms.qq.feehi.com/api/articles)
      
2. 使用Docker容器
    ```bash
    $ docker pull registry.cn-hangzhou.aliyuncs.com/liufee/cms
    $ docker run --name feehicms -h feehicms -itd -p 80:80 -p 22:22 liufee/cms
    ```
   
   
项目展示
------------
* [lcs消费金融](http://118.89.241.65/)   
* [吉安市食品药品监督管理局](http://jamsda.jsz2.com:8011/)  
* [微信公众号益乐游戏](http://www.ylegame.com/)  
* [Usens Dev博客](http://dev.usensinc.com/)  
* [最美容颜](http://www.zmface.com/)  
* [有温度](http://youwendu.cn/)  
* [云上旅游集团](http://www.ys517.cn/)  
* [微信公众号蚂蚁鲜生](http://www.chijidun.com/) 
*  ......
   
最后更新2017年11月24日