#权限
>[info]FeehiCMS1.0.0完全重写了rbac权限管理，替换为yii2自带的rbac实现，主要借鉴了mdmsoft/yii2-admin扩展，使之更符合国人的操作习惯

##配置
backend/config/main.php
   ```php
    'as access' => [
        'class' => backend\components\AccessControl::className(),
        'allowActions' => [//不受权限控制的路由，格式为module/controller/action
            'site/login',
            'site/captcha',
            'site/error',
            'site/index',
            'site/main',
            'site/logout',
            'site/language',
            'admin-user/request-password-reset',
            'admin-user/reset-password',
            'admin-user/update-self',
            'debug/*',//*为通配符，表示所有以debug/开始的路由
            'gii/*',
        ],
        'superAdminUserIds' => [1],//超级管理员用户id，拥有所有权限，不受权限管理的控制
    ],
   ```
