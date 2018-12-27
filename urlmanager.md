#路由美化
路由美化需要配合web服务器伪静态配置，默认前后台都未开启。

##后台
不建议美化后台路由，如果确有需要请自行编写伪静态规则然后修改backend/config/main.php

##前台
1. 确保web服务器开启并配置了伪静态，并重启web服务器。详见http://doc.feehi.com/install.html
2. 修改frontend/config/main.php为

```php
    return [
        'id' => 'app-frontend',
        //...
        'components' => [
            'urlManager' => [
                'enablePrettyUrl' => true,//true 美化路由(注:需要配合web服务器配置伪静态，false 不美化路由
                'showScriptName' => false,//隐藏index.php
            ],
        ],
    ];

```

如果点击网页上的链接报404错误页面，请检查伪静态配置。
