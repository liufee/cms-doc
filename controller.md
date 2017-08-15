#控制器

##已有的控制

AdminRolesController.php  后台角色管理控制器

AdminUserController.php  后台用户管理控制器

ArticleController.php  文章管理控制器

AssetsController.php  公共资源上传控制器

CategoryController.php  文章分类管理控制器

ClearController.php  清除缓存控制器

CommentController.php  评论管理控制器

FriendLinkController.php  友情链接管理控制器

FrontendMenuController.php  前台菜单管理控制器

LogController.php  后台管理员操作日志控制器

MenuController.php  后台菜单管理控制器

PageController.php  单页管理控制器

SettingController  设置管理控制器

SiteController.php  默认首页控制器

UserController.php  前台用户管理控制器

##已有的独立操作
CreateAction.php 创建独立操作

DeleteAction.php 删除独立操作

IndexAction.php 列表独立操作

SortAction.php 排序独立操作

StatusAction.php  状态改变独立操作

UpdateAction.php  修改独立操作

ViewAction.php  浏览独立操作

如果您编写一个新控制器时，可以参考以上控制器，简单的配置就能使该控制器具有增、删、改、查、列表、排序、改变状态的功能。

这里以ArticleController为例:

1. 首先创建ArticleController，并让他继承自\yii\web\Controller

2. 覆写\yii\web\Controller::actions()
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
                'create' => [//当路由执行为article/create的时候，执行这里的独立操作
                    'class' => CreateAction::className(),//独立操作的类名
                    'modelClass' => Article::className(),//要创建的模型类名称
                    'scenario' => 'article',//可选参数，如果模型有场景的时候需要指定场景，默认为default场景
                ],
                //不描述了，下面的都一摸一样，配置一个modelClass属性，就知道是操作的哪个模型
                'update' => [
                    'class' => UpdateAction::className(),
                    'modelClass' => Article::className(),
                    'scenario' => 'article',
                ],
                'view-layer' => [
                    'class' => ViewAction::className(),
                    'modelClass' => Article::className(),
                ],
                'delete' => [
                    'class' => DeleteAction::className(),
                    'modelClass' => Article::className(),
                ],
                'sort' => [
                    'class' => SortAction::className(),
                    'modelClass' => Article::className(),
                ],
                'status' => [
                    'class' => StatusAction::className(),
                    'modelClass' => Article::className(),
                ],
            ];
        }
    ```