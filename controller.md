#控制器

##后台

###已有的控制

AdminRolesController.php  后台角色管理控制器

AdminUserController.php  后台用户管理控制器

ArticleController.php  文章管理控制器

AssetsController.php  公共资源上传控制器

CategoryController.php  文章分类管理控制器

ClearController.php  清除缓存控制器

CommentController.php  评论管理控制器

FriendlyLinkController.php  友情链接管理控制器

FrontendMenuController.php  前台菜单管理控制器

LogController.php  后台管理员操作日志控制器

MenuController.php  后台菜单管理控制器

PageController.php  单页管理控制器

SettingController  设置管理控制器

SiteController.php  默认首页控制器

UserController.php  前台用户管理控制器

###已有的独立操作

CreateAction.php 创建独立操作

DeleteAction.php 删除独立操作

IndexAction.php 列表独立操作

SortAction.php 排序独立操作

UpdateAction.php  修改独立操作

ViewAction.php  浏览独立操作

###创建控制器
>**[info]如果您编写一个新控制器时，可以参考以上控制器，简单的配置就能使该控制器具有增、删、改、查、列表、排序、改变状态的功能。**

这里以ArticleController为例:

1. 首先创建ArticleController，并让他继承自\yii\web\Controller

2. 覆写\yii\web\Controller::actions()，如下:
    ```php
    //记住在顶部先把这些独立操作use进来
    use backend\actions\CreateAction;
    use backend\actions\UpdateAction;
    use backend\actions\IndexAction;
    use backend\actions\ViewAction;
    use backend\actions\DeleteAction;
    use backend\actions\SortAction;
    use backend\actions\StatusAction;
 
    public function actions()
        {
            return [
                'index' => [//当路由为article/index的时候，执行这里的独立操作
                    'class' => IndexAction::className(),//指定独立操作的类名
                    'data' => function(){//配置data属性，这里传入一个闭包，可以去IndexAction阅读一下源代码，就是把这个data数组赋给了模板
                        $searchModel = new ArticleSearch(['scenario' => 'article']);
                        $dataProvider = $searchModel->search(yii::$app->getRequest()->getQueryParams());
                        return [
                            'dataProvider' => $dataProvider,
                            'searchModel' => $searchModel,
                        ];
                    }
                ],
                'create' => [//当路由为article/create的时候，执行这里的独立操作
                    'class' => CreateAction::className(),//独立操作的类名
                    'modelClass' => Article::className(),//要创建的模型类名
                    'scenario' => 'article',//可选参数，如果模型有场景的时候需要指定场景，默认为default场景
                ],
                'update' => [//当路由为article/update的时候，执行这里的独立操作
                    'class' => UpdateAction::className(),//独立操作的类名称
                    'modelClass' => Article::className(),//要修改的模型类名
                    'scenario' => 'article',//可选参数，如果模型有场景的时候需要指定场景，默认为default场景
                ],
                'view-layer' => [//当路由为article/view-layper，执行这里的独立操作
                    'class' => ViewAction::className(),//独立操作的类名称
                    'modelClass' => Article::className(),//要查看的模型类名
                ],
                'delete' => [//当路由为article/delete，执行这里的独立操作
                    'class' => DeleteAction::className(),//独立操作的类名称
                    'modelClass' => Article::className(),//要删除的模型类名
                ],
                'sort' => [//当路由为article/sort，执行这里的独立操作
                    'class' => SortAction::className(),//独立操作的类名称
                    'modelClass' => Article::className(),//要排序的模型类名(首页列表排序按钮操作)
                ],
                'status' => [//当路由为article/update，执行这里的独立操作
                    'class' => StatusAction::className(),//独立操作的类名称
                    'modelClass' => Article::className(),//要修改的类名称(首页展示的状态按钮，只更新单个字段而不必进入编辑页面)
                ],
            ];
        }
    ```
    至此当前控制器已经具备了增、删、改、查、排序功能

##前台（略）