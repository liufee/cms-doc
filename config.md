#配置

1. common/config/bootstrap.php （前后台都会执行的初始化操作）
   
   这里主要是设置前后台都需要的目录，做一些目录别名的设置
    ```php
    Yii::setAlias('@common', dirname(__DIR__));
    Yii::setAlias('@frontend', dirname(dirname(__DIR__)) . '/frontend');
    Yii::setAlias('@backend', dirname(dirname(__DIR__)) . '/backend');
    Yii::setAlias('@console', dirname(dirname(__DIR__)) . '/console');
    Yii::setAlias('@feehi', dirname(dirname(__DIR__)) . '/feehi');//保证use feehi/xxx能通过composer自动加载
    
    Yii::setAlias('@uploads', '@frontend/web/uploads');//文件上传目录
    Yii::setAlias('@article', '@uploads/article');//文章相关资源上传目录
    Yii::setAlias('@thumb', '@article/thumb');//文章缩略图上传目录
    Yii::setAlias('@ueditor', '@uploads/ueditor');//文章ueditor编辑器资源上传目录
    Yii::setAlias('@friendlylink', '@uploads/friendlylink');//友情链接图片上传目录
    ```
    
2. common/config/main.php （前后台共有的配置）
   ```php
       'name' => 'Feehi CMS',//应用名称
       'version' => '0.1.0',//应用版本号
       'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',//composer的vendor目录地址
       'components' => [//组件配置
           'db' => [//db组件配置
               'class' => yii\db\Connection::className(),
               'dsn' => 'mysql:host=localhost;dbname=feehi',
               'username' => 'root',
               'password' => '',
               'charset' => 'utf8mb4',
           ],
           'cache' => [
               'class' => yii\caching\DummyCache::className(),//缓存组件配置
           ],
           'formatter' => [//formatter组件配置
               'dateFormat' => 'php:Y-m-d H:i',//日期显示格式
               'decimalSeparator' => ',',
               'thousandSeparator' => ' ',
               'currencyCode' => 'CHY',//货币单位
               'nullDisplay' => '-',//空值显示成的符号
           ],
           'mailer' => [//邮件组件配置，注：后台管理页面的邮件配置会覆盖这里的配置
               'class' => yii\swiftmailer\Mailer::className(),
               'viewPath' => '@common/mail',//邮件模板根目录
               'useFileTransport' => false,//false发送邮件，true只是生成邮件在runtime文件夹下，不发邮件
               'transport' => [
                   'class' => 'Swift_SmtpTransport',
                   'host' => 'smtp.feehi.com',  //每种邮箱的host配置不一样
                   'username' => 'admin@feehi.com',
                   'password' => 'password',
                   'port' => '586',
                   'encryption' => 'tls',
               ],
               'messageConfig' => [
                   'charset' => 'UTF-8',
                   'from' => ['admin@feehi.com' => 'Feehi CMS robot ']
               ],
           ],
       ],

   ```
   
3. common/config/params.php （前后台共有的参数配置）
    ```php
    [
       'supportEmail' => 'admin@feehi.com',
       'user.passwordResetTokenExpire' => 3600,//重置密码token的有效时间
       'site' => [
           'url' => 'http://cms.feehi.com',//网站跟地址，后台管理页面中的设置会覆盖此处
           'sign' => '###~SITEURL~###',//数据库中保存的本站地址，展示时替换成正确url，如文章中包含的图片在数据库中保存为###~SITEURL~###/uploads/xxx.jpg
       ],
       'admin' => [
           'url' => 'http://admin.cms.feehi.com',//管理后台地址
       ]
    ];
    ```
    
4. backend/config/bootstrap.php (后台初始化)
    ```php
    Yii::setAlias('@admin', '@frontend/web/admin');//设置@admin为frontend/web/admin别名
    ```

5. backend/config/main.php （后台配置）
      ```php
      [
          'id' => 'app-backend',//应用id，必须唯一
          'basePath' => dirname(__DIR__),
          'controllerNamespace' => 'backend\controllers',//控制器命名空间
          'language' => 'zh-CN',//默认语言
          'timeZone' => 'Asia/Shanghai',//默认时区
          'bootstrap' => ['log'],
          'modules' => [],//模块配置
          'components' => [
              'user' => [//user组件
                  'identityClass' => backend\models\User::className(),
                  'enableAutoLogin' => true,
                  'identityCookie' => ['name' => '_backend_identity'],
                  'idParam' => '__backend__id',
                  'returnUrlParam' => '_backend_returnUrl',
              ],
              'log' => [//此项具体详细配置，请访问http://wiki.feehi.com/index.php?title=Yii2_log
                  'traceLevel' => YII_DEBUG ? 3 : 0,
                  'targets' => [
                      [
                          'class' => yii\log\FileTarget::className(),//当触发levels配置的错误级别时，保存到日志文件
                          'levels' => ['error', 'warning'],
                      ],
                      [
                          'class' => yii\log\EmailTarget::className(),//当触发levels配置的错误级别时，发送到此些邮箱（请改成自己的邮箱）
                          'levels' => ['error', 'warning'],
                          /*'categories' => [//默认匹配所有分类。启用此项后，仅匹配数组中的分类信息会触发邮件提醒（白名单）
                              'yii\db\*',
                              'yii\web\HttpException:*',
                          ],*/
                          'except' => [//以下配置，除了匹配数组中的分类信息都会触发邮件提醒（黑名单）
                              'yii\web\HttpException:404',
                              'yii\web\HttpException:403',
                              'yii\debug\Module::checkAccess',
                          ],
                          'message' => [
                              'to' => ['admin@feehi.com', 'liufee@126.com'],
                              'subject' => '来自 Feehi CMS 后台的新日志消息',
                          ],
                      ],
                  ],
              ],
              'errorHandler' => [
                  'errorAction' => 'site/error',//错误处理器，捕捉到异常后都会执行此控制器的方法
              ],
              'rbac' => [//权限管理配置
                  'class' => backend\components\Rbac::className(),
                  'superAdministrators' => [//此处设置超级管理员用户数组，不受权限管理的控制
                      'admin',
                      'administrator',
                  ],
                  'noNeedAuthentication' => [//无需权限管理的控制器/操作，任意角色、用户，包括未登录均可访问
                      'site/index',
                      'site/login',
                      'site/logout',
                      'site/main',
                      'site/captcha',
                      'site/error',
                      'site/language',
                      'admin-user/update-self',
                      'error/forbidden',
                      'error/not-found',
                      'debug/default/toolbar',
                      'debug/default/view',
                      'assets/ueditor'
                  ],
              ],
              'request' => [
                  'csrfParam' =>'_csrf_backend',
              ],
              'i18n' => [
                  'translations' => [//多语言包设置
                      'app*' => [
                          'class' => yii\i18n\PhpMessageSource::className(),
                          'basePath' => '@backend/messages',
                          'sourceLanguage' => 'en-US',
                          'fileMap' => [
                              'app' => 'app.php',
                              'app/error' => 'error.php',
                          ],
                      ],
                      'menu' => [
                          'class' => yii\i18n\PhpMessageSource::className(),
                          'basePath' => '@backend/messages',
                          'sourceLanguage' => 'zh-CN',
                          'fileMap' => [
                              'app' => 'menu.php',
                              'app/error' => 'error.php',
                          ],
                      ],
                  ],
              ],
          ],
          'on beforeRequest' => [feehi\components\Feehi::className(), 'backendInit'],
          'on beforeAction' => [backend\components\Rbac::className(), 'checkPermission'],
          'params' => $params,
      ];
      ```
6. frontend/config/main.php(前台配置)
    ```php
     [
        'id' => 'app-frontend',
        'basePath' => dirname(__DIR__),
        'bootstrap' => ['log'],
        'controllerNamespace' => 'frontend\controllers',
        'components' => [
            'user' => [//前台用户组件配置
                'identityClass' => common\models\User::className(),
                'enableAutoLogin' => true,
            ],
            'log' => [
                'traceLevel' => YII_DEBUG ? 3 : 0,
                'targets' => [//和backend配置一样，参见上面
                    [
                        'class' => yii\log\FileTarget::className(),
                        'levels' => ['error', 'warning'],
                    ],
                    [
                        'class' => yii\log\EmailTarget::className(),
                        'levels' => ['error', 'warning'],
                        'except' => [
                            'yii\debug\Module::checkAccess',
                        ],
                        'message' => [
                            'to' => ['admin@feehi.com', 'liufee@126.com'],//当触发levels配置的错误级别时，发送到此些邮箱（请改成自己的邮箱）
                            'subject' => '来自 Feehi CMS 前台的新日志消息',
                        ],
                    ],
                ],
            ],
            'errorHandler' => [//和backend一致，参见上面
                'errorAction' => 'site/error',
            ],
            'cache' => [
                'class' => yii\caching\FileCache::className(),//使用文件缓存，可根据需要改成apc redis memcache等其他缓存方式
                'keyPrefix' => 'frontend',       // 唯一键前缀
            ],
            'urlManager' => [//路由配置
                'enablePrettyUrl' => true,//是否美化路由（即pathinfo模式，不用写?r=xxx）
                'showScriptName' => false,//隐藏index.php
                'enableStrictParsing' => false,//是否严格匹配路径，路由大小写是否敏感
                //'suffix' => '.html',//后缀，如果设置了此项，那么浏览器地址栏就必须带上.html后缀，否则会报404错误
                'rules' => [//配置的路由规则，能够用更简单的路由去访问页面，具体写好要参考yii2的文档
                    //'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
                    //'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>?id=<id>'
                    //'detail/<id:\d+>' => 'site/detail?id=$id',
                    //'post/22'=>'site/detail',
                    //'<controller:detail>/<id:\d+>' => '<controller>/index',
                    '' => 'article/index',
                    //'<controller:w+>/<action:\w+>'=>'<controller>/<action>',
                    '<page:\d+>' => 'article/index',
                    'login' => 'site/login',
                    'signup' => 'site/signup',
                    'about|contact' => 'page/view',
                    'page/<name:\w+>' => 'page/view',
                    'view/<id:\d+>' => 'article/view',
                    'comment' => 'article/comment',
                    'article/view/id/<id:\d+>' => 'article/view',
                    'search' => 'search/index',
                    'cat/<cat:\w+>' => 'article/index',
                    'list/<page:\d+>' => 'site/index',
                    'python|java|javascript' => 'article/index',
                ],
            ],
            'i18n' => [//多语言，和backend一致，参见上面
                'translations' => [
                    'app*' => [
                        'class' => yii\i18n\PhpMessageSource::className(),
                        'basePath' => '@backend/messages',
                        'sourceLanguage' => 'en-US',
                        'fileMap' => [
                            'app' => 'app.php',
                            'app/error' => 'error.php',
    
                        ],
                    ],
                    'front*' => [
                        'class' => yii\i18n\PhpMessageSource::className(),
                        'basePath' => '@frontend/messages',
                        'sourceLanguage' => 'en-US',
                        'fileMap' => [
                            'frontend' => 'frontend.php',
                            'app/error' => 'error.php',
    
                        ],
                    ],
                ],
            ],
        ],
        'params' => $params,
        'on beforeRequest' => function($event){
            \feehi\components\Feehi::frontendInit();
            if(isset(\yii::$app->session['view'])) \yii::$app->viewPath = dirname(__DIR__).'/'.\yii::$app->session['view'];
            if(isset(\yii::$app->session['language'])) \yii::$app->language = yii::$app->session['language'];
        }
    ]
    ```