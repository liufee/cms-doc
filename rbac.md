#权限
>[info]FeehiCMS1.0.0完全重写了rbac权限管理，替换为yii2自带的rbac实现，主要借鉴了mdmsoft/yii2-admin扩展，使之更符合国人的操作习惯

##配置
backend/config/main.php
   ```php
    'as access' => [
        'class' => backend\components\AccessControl::className(),
        'allowActions' => [//不受权限控制的路由，格式为module/controller/action，没有采用module开发可以不用module
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
   
##使用方式
1. 创建权限(权限最细粒度为操作的HTTP请求方式)
2. 赋予权限

   2.1 直接给管理员赋予权限
   
   2.2 创建角色给角色赋予权限再给管理员赋予角色
   
   
##创建权限的方式
1. 通过后台管理
   
   后台菜单->权限管理->权限->创建，填写/controller/action并选择http请求方式(主要为了区分同一action可以有get查看和post执行修改的功能)


2. 通过代码注释(**荐**)
    1.1 在controller::actions()方法上的注释，如ArticleController::actions()
    ```php
            /**
             * @auth
             * - item group=内容 category=文章 description-get=列表 sort=300 method=get
             * - item group=内容 category=文章 description-get=查看 sort=301 method=get  
             * - item group=内容 category=文章 description=创建 sort-get=302 sort-post=303 method=get,post  
             * - item group=内容 category=文章 description=修改 sort=304 sort-post=305 method=get,post  
             * - item group=内容 category=文章 description-post=删除 sort=306 method=post  
             * - item group=内容 category=文章 description-post=排序 sort=307 method=post  
             * @return array
             */
            public function actions()
            {
                return [
                    'index' => [
                        'class' => IndexAction::className(),
                        'data' => function(){
                            /** @var $searchModel ArticleSearch */
                            $searchModel = Yii::createObject( ArticleSearch::className() );
                            $dataProvider = $searchModel->search( Yii::$app->getRequest()->getQueryParams() );
                            return [
                                'dataProvider' => $dataProvider,
                                'searchModel' => $searchModel,
                            ];
                        }
                    ],
                    'view-layer' => [
                        'class' => ViewAction::className(),
                        'modelClass' => Article::className(),
                    ],
                    'create' => [
                        'class' => CreateAction::className(),
                        'modelClass' => Article::className(),
                        'scenario' => 'article',
                    ],
                    'update' => [
                        'class' => UpdateAction::className(),
                        'modelClass' => Article::className(),
                        'scenario' => 'article',
                    ],
                    'delete' => [
                        'class' => DeleteAction::className(),
                        'modelClass' => Article::className(),
                    ],
                    'sort' => [
                        'class' => SortAction::className(),
                        'modelClass' => Article::className(),
                        'scenario' => 'article',
                    ],
                ];
            }
    ```
    1.2 在controller::actionX()方法上的注释，如SettingController::actionsWebsite()
    ```php
        /**
         * 网站设置
         *
         * @auth - item group=设置 category=网站设置 description=网站设置 sort-get=100 sort-post=101 method=get,post
         * @return string
         * @throws \yii\base\InvalidConfigException
         */
        public function actionWebsite()
        {
            $model = Yii::createObject( SettingWebsiteForm::className() );
            if (Yii::$app->getRequest()->getIsPost()) {
                if ($model->load(Yii::$app->getRequest()->post()) && $model->validate() && $model->setWebsiteConfig()) {
                    Yii::$app->getSession()->setFlash('success', Yii::t('app', 'Success'));
                } else {
                    $errors = $model->getErrors();
                    $err = '';
                    foreach ($errors as $v) {
                        $err .= $v[0] . '<br>';
                    }
                    Yii::$app->getSession()->setFlash('error', $err);
                }
            }
    
            $model->getWebsiteSetting();
            return $this->render('website', [
                'model' => $model
            ]);
    
        }
    ```
    
必须以@auth开头，并且每个item和return的数组key一一对应，顺序不能错，因为会根据此自动生成路由。

group              组

category           分类

description-get    描述(对应get的描述，配合method=get,post使用)

description-post   描述(对应post的描述，配合method=get,post使用)

description        描述(当method=get或者method=post时，表示此method的描述)

sort-get           排序(当method=get,post时，表示get时的排序)

sort-post          排序(当method=get,post时，表示post时的排序)

sort               排序(当method=get或者method=post时，表示此method的描述)

method             http请求方式,可能的值 method=get,post表示此操作有get和post请求方式，也可以是method=get或者method=post

3. 备注好方法后执行
```shell
    /path/to/php ./yii feehi/permission即可自动创建权限
``