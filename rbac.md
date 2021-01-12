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
  - 1 通过后台管理
   
   后台菜单->权限管理->权限->创建，填写/controller/action并选择http请求方式(主要为了区分同一action可以有get查看和post执行修改的功能)


  - 2 通过代码注释(**荐**)

    * 2.1 在 `controller::actions()` 方法上的注释，如 `ArticleController::actions()`  所有方法都写在 `actions` 里，那么生成权限的 `item` 也应该定义在 `actions` 方法上方的注释区 [示例代码如下](https://github.com/liufee/cms/blob/master/backend/controllers/ArticleController.php) ：
    ```php 
    /**
    * Author: lf
    * Blog: https://blog.feehi.com
    * Email: job@feehi.com
    * Created at: 2016-03-23 15:13
    */

    namespace backend\controllers;

    use Yii;
    use common\services\CategoryServiceInterface;
    use common\models\Article;
    use common\services\ArticleServiceInterface;
    use backend\actions\CreateAction;
    use backend\actions\UpdateAction;
    use backend\actions\IndexAction;
    use backend\actions\ViewAction;
    use backend\actions\DeleteAction;
    use backend\actions\SortAction;
    use yii\helpers\ArrayHelper;

    /**
    * Article management
    * - data:
    *          table article article_content
    * - description:
    *          article management
    *
    * Class ArticleController
    * @package backend\controllers
    */
    class ArticleController extends \yii\web\Controller
    {

        /**
        * @auth
        * - item group=内容 category=文章 description-get=列表 sort=300 method=get
        * - item group=内容 category=文章 description-get=查看 sort=301 method=get
        * - item group=内容 category=文章 description=创建 sort-get=302 sort-post=303 method=get,post
        * - item group=内容 category=文章 description=修改 sort=304 sort-post=305 method=get,post
        * - item group=内容 category=文章 description-post=删除 sort=306 method=post
        * - item group=内容 category=文章 description-post=排序 sort=307 method=post
        * @return array
        * @throws \yii\base\InvalidConfigException
        */
        public function actions()
        {
            /** @var ArticleServiceInterface $service */
            $service = Yii::$app->get(ArticleServiceInterface::ServiceName);
            /** @var CategoryServiceInterface $categoryService */
            $categoryService = Yii::$app->get(CategoryServiceInterface::ServiceName);

            return [
                'index' => [
                    'class' => IndexAction::className(),
                    'data' => function($query) use($service, $categoryService){
                        $result = $service->getList($query, ['type'=>Article::ARTICLE]);
                        return [
                            'dataProvider' => $result['dataProvider'],
                            'searchModel' => $result['searchModel'],
                            'categories' => ArrayHelper::getColumn($categoryService->getLevelCategoriesWithPrefixLevelCharacters(), "prefix_level_name"),
                            'frontendURLManager' => $service->getFrontendURLManager()
                        ];
                    }
                ],
                'view-layer' => [
                    'class' => ViewAction::className(),
                    'data' => function($id) use($service){
                        return [
                            'model' => $service->getDetail($id),
                        ];
                    },
                ],
                'create' => [
                    'class' => CreateAction::className(),
                    'doCreate' => function($postData) use($service){
                        return $service->create($postData, ['scenario'=>ArticleServiceInterface::ScenarioArticle]);
                    },
                    'data' => function($createResultModel,  CreateAction $createAction) use($service, $categoryService){
                        return [
                            'model' => $createResultModel === null ? $service->newModel(['scenario'=>ArticleServiceInterface::ScenarioArticle]) : $createResultModel['articleModel'],
                            'contentModel' => $createResultModel === null ? $service->newArticleContentModel() : $createResultModel['articleContentModel'] ,
                            'categories' => ArrayHelper::getColumn($categoryService->getLevelCategoriesWithPrefixLevelCharacters(), "prefix_level_name"),
                        ];
                    },
                ],
                'update' => [
                    'class' => UpdateAction::className(),
                    'doUpdate' => function($id, $postData) use($service){
                        return $service->update($id, $postData, ['scenario'=>ArticleServiceInterface::ScenarioArticle]);
                    },
                    'data' => function($id, $updateResultModel) use($service, $categoryService){
                        return [
                            'model' => $updateResultModel === null ? $service->getDetail($id, ['scenario'=>ArticleServiceInterface::ScenarioArticle]) : $updateResultModel['articleModel'],
                            'contentModel' => $updateResultModel === null ? $service->getArticleContentDetail($id) : $updateResultModel['articleContentModel'],
                            'categories' => ArrayHelper::getColumn($categoryService->getLevelCategoriesWithPrefixLevelCharacters(), "prefix_level_name"),
                        ];
                    }
                ],
                'delete' => [
                    'class' => DeleteAction::className(),
                    'doDelete' => function($id) use($service){
                        return $service->delete($id);
                    },
                ],
                'sort' => [
                    'class' => SortAction::className(),
                    'doSort' => function($id, $sort) use($service){
                        return $service->sort($id, $sort, ['scenario'=>ArticleServiceInterface::ScenarioArticle]);
                    }
                ],
            ];
        }

    }
      ```
    
    * 2.2 在 `controller::actionX()` 方法上的注释，如 `CommentController::actionsDelete()` 是定义在 `actions` 之外的方法，那么生成权限的 `item` 也应该定义在 `actionsDelete()` 方法上方的注释区 示例如下：

    ```php 

      /**
      * Author: lf
      * Blog: https://blog.feehi.com
      * Email: job@feehi.com
      * Created at: 2017-10-03 22:03
      */

      namespace backend\controllers;

      use yii;
      use backend\actions\ViewAction;
      use backend\actions\UpdateAction;
      use backend\models\Comment;
      use backend\actions\IndexAction;
      use yii\db\ActiveRecord;

      class CommentController extends \yii\web\Controller
      {
          /**
          * @auth
          * - item group=内容 category=评论 description-get=列表 sort=320 method=get
          * - item group=内容 category=评论 description-get=查看 sort=321 method=get
          * - item group=内容 category=评论 description=修改 sort-get=322 sort-post=323 method=get,post
          * @return array
          */
          public function actions()
          {
              return [
                  'index' => [
                      'class' => IndexAction::className(),
                      'data' => function(){
                          $searchModel = new CommentSearch();
                          $dataProvider = $searchModel->search(yii::$app->getRequest()->getQueryParams());
                          return [
                              'dataProvider' => $dataProvider,
                              'searchModel' => $searchModel,
                          ];
                      }
                  ],
                  'view-layer' => [
                      'class' => ViewAction::className(),
                      'modelClass' => Comment::className(),
                  ],
                  'update' => [
                      'class' => UpdateAction::className(),
                      'modelClass' => Comment::className(),
                  ],
                  // 'delete' => [
                  //     'class' => DeleteAction::className(),
                  //     'modelClass' => Comment::className(),
                  // ],
              ];
          }

          /**
          * @auth - item group=内容 category=评论 description-post=删除 sort=324 method=post
          */
          public function actionsDelete()
          {
              //do something
          }
      }
    ```
    
  - **ps:** 必须以`@auth`开头，并且每个 `item` 和 `return` 的数组 `key` 一一对应，顺序不能错，因为会根据此自动生成路由。
  如果增加了自定义方法，需要把之前在 `actions` 定义的权限 `item` 移除，然后添加到自定义的方法上。

 
| 标识                |描述 |
| ------------------ | ------ |
| group              | 组 |
| category           | 分类 |
| description-get    | 描述(对应get的描述，配合method=get,post使用) |
| description-post   | 描述(对应post的描述，配合method=get,post使用) |
| description        | 描述(当method=get或者method=post时，表示此method的描述) |
| sort-get           | 排序(当method=get,post时，表示get时的排序) |
| sort-post          | 排序(当method=get,post时，表示post时的排序) |
| sort               | 排序(当method=get或者method=post时，表示此method的描述) |
| method             | http请求方式,可能的值 method=get,post表示此操作有get和post请求方式，也可以是method=get或者method=post |

   备注好方法后执行
```shell
    /path/to/php ./yii feehi/permission 
```

- 也可以在方法后面加上 `--interactive=0` 表示忽略命令行的交互式操作
即可自动创建权限