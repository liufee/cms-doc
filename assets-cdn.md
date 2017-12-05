#js css cdn配置

>*[info]请把以下resource.nos-eastchina1.126.net替换成你自己的实际地址，并上传相关文件到cdn*

##yii2框架依赖的assets资源使用cdn
在common/config/main-local.php覆盖掉common/config/main.php配置
```php
    'assetManager' => [
        'bundles' => [
            yii\widgets\ActiveFormAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/yii.activeForm.js'
                ],
            ],
            yii\bootstrap\BootstrapAsset::className() => [
                'css' => [],
                'sourcePath' => null,
            ],
            yii\captcha\CaptchaAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/yii.captcha.js'
                ],
            ],
            yii\grid\GridViewAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/yii.gridView.js'
                ],
            ],
            yii\web\JqueryAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/jquery.js'
                ],
            ],
            yii\widgets\PjaxAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/jquery.pjax.js'
                ],
            ],
            yii\web\YiiAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/yii.js'
                ],
            ],
            yii\validators\ValidationAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/yii/yii.validation.js'
                ],
            ],
        ],
    ],
```

###后台assets资源使用cdn
在backend/config/main-local.php中覆盖backend/config/main.php
```php
    'assetManager' => [
        'bundles' => [
            backend\assets\AppAsset::className() => [
                'css' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/backend/css/bootstrap.min14ed.css?v=3.3.6',
                    'b' => '//resource.nos-eastchina1.126.net/feehi/backend/css/font-awesome.min93e3.css?v=4.4.0',
                    'c' => '//resource.nos-eastchina1.126.net/feehi/backend/css/animate.min.css',
                    'd' => '//resource.nos-eastchina1.126.net/feehi/backend/css/style.min862f.css?v=4.1.0',
                    'e' => '//resource.nos-eastchina1.126.net/feehi/backend/css/plugins/sweetalert/sweetalert.css',
                    'f' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/layer/laydate/need/laydate.css',
                    'g' => '//resource.nos-eastchina1.126.net/feehi/backend/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
                    'h' => '//resource.nos-eastchina1.126.net/feehi/backend/css/plugins/toastr/toastr.min.css',

                ],
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/backend/js/feehi.js',
                    'b' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/sweetalert/sweetalert.min.js',
                    'c' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/layer/laydate/laydate.js',
                    'd' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/layer/layer.min.js',
                    'e' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/prettyfile/bootstrap-prettyfile.js',
                    'f' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/toastr/toastr.min.js',
                ],
            ],
            backend\assets\IndexAsset::className() => [
                'css' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/backend/css/bootstrap.min.css',
                    'b' => '//resource.nos-eastchina1.126.net/feehi/backend/css/font-awesome.min93e3.css?v=4.4.0',
                    'c' => '//resource.nos-eastchina1.126.net/feehi/backend/css/style.min862f.css?v=4.1.0',
                ],
                'js' => [
                    'a' => "//resource.nos-eastchina1.126.net/feehi/backend/js/jquery.min.js?v=2.1.4",
                    'b' => "//resource.nos-eastchina1.126.net/feehi/backend/js/bootstrap.min.js?v=3.3.6",
                    'c' => "//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/metisMenu/jquery.metisMenu.js",
                    'd' => "//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/slimscroll/jquery.slimscroll.min.js",
                    'e' => "//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/layer/layer.min.js",
                    'f' => "//resource.nos-eastchina1.126.net/feehi/backend/js/hplus.min.js?v=4.1.0",
                    'g' => "//resource.nos-eastchina1.126.net/feehi/backend/js/contabs.min.js",
                    'h' => "//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/pace/pace.min.js",
                ]
            ],
            backend\assets\UeditorAsset::className() => [
                'css' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/backend/js/plugins/ueditor/ueditor.all.min.js'
                ],
            ],
        ]
    ],
```

###前台assets资源使用cdn
在frontend/config/main-local.php中覆盖frontend/config/main.php
```php
    'assetManager' => [
        'bundles' => [
            frontend\assets\AppAsset::className() => [
                'css' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/frontend/css/style.css',
                    'b' => '//resource.nos-eastchina1.126.net/feehi/frontend/plugins/toastr/toastr.min.css',
                ],
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/frontend/js/jquery.min.js',
                    'b' => '//resource.nos-eastchina1.126.net/feehi/frontend/js/index.js',
                    'c' => '//resource.nos-eastchina1.126.net/feehi/frontend/plugins/toastr/toastr.min.js',
                ],
            ],
            frontend\assets\IndexAsset::className() => [
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/frontend/js/responsiveslides.min.js',
                ]
            ],
            frontend\assets\ViewAsset::className() => [
                'css' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/styles/shCoreDefault.css'
                ],
                'js' => [
                    'a' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/scripts/shCore.js',
                    'b' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/scripts/shBrushJScript.js',
                    'c' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/scripts/shBrushPython.js',
                    'd' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/scripts/shBrushPhp.js',
                    'e' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/scripts/shBrushJava.js',
                    'f' => '//resource.nos-eastchina1.126.net/feehi/frontend/syntaxhighlighter/scripts/shBrushCss.js',
                ]
            ],
        ]
    ]
```