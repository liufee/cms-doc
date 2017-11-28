#目录结构

##backend 后台

###-actions 后台独立操作，后台的增、删、改、查、排序功能

--CreateAction.php 创建独立操作

--DeleteAction.php 删除独立操作

--IndexAction.php 列表独立操作

--SortAction.php 排序独立操作

--UpdateAction.php  修改独立操作

--ViewAction.php  浏览独立操作

###-assets 后台资源管理

--AppAsset.php 整个后台都会加载的资源(除siteController控制器以外)

--IndexAsset.php SiteController会加载的资源

--JstreeAsset.php js插件jstree资源

--Ueditor.php js插件ueditor资源

###-components 后台组件

--AdminLog.php   后台管理员操作日志记录组件

--AccessController.php  后台权限过滤行为

###-config 后台管理配置目录

--boostrap.php

--main.php

--main-local.php

--params.php

--params-local.php

###-controllers  后台管理控制器目录

--AdminRolesController.php  后台角色管理控制器

--AdminUserController.php  后台用户管理控制器

--ArticleController.php  文章管理控制器

--AssetsController.php  公共资源上传控制器

--CategoryController.php  文章分类管理控制器

--ClearController.php  清除缓存控制器

--CommentController.php  评论管理控制器

--FriendlyLinkController.php  友情链接管理控制器

--FrontendMenuController.php  前台菜单管理控制器

--LogController.php  后台管理员操作日志控制器

--MenuController.php  后台菜单管理控制器

--PageController.php  单页管理控制器

--SettingController  设置管理控制器

--SiteController.php  默认首页控制器

--UserController.php  前台用户管理控制器

###-grid 列表页相关组件

--ActionColumn.php  操作栏控制

--CheckboxColumn.php 复选框栏控制

--DataColumn.php 内容栏控制

--DateColumn.php  时间栏控制

--GridView.php  网格控制

--StatusColumn.php  状态栏控制

--StatusColumn.php  排序栏控制

###-messages

--en

---menu.php  菜单中译英

-zh

---app.php  后台管理所有英译中

###-models
--form

---PasswordResetRequestForm  请求重置管理员密码表单

---ResetPasswordForm  重置管理员密码表单

---SettingSmtpForm.php  邮件设置表单

---SettingWebsiteForm  网站设置表单

---LoginForm 后台管理员登陆表单

--search

---ArticleSearch  搜索article

---AdminLogSearch.php  搜索admin_log

---CommentSearch.php  搜索评论

---MenuSearch  搜索menu

---UserSearch.php  搜索user

--AdminLog.php  数据表admin_log

--Article  数据表article

--ArticleContent  数据表article_content

--Comment.php  数据表comment

--FriendlyLink.php  数据表friendly_link

--Menu  数据表menu

--User.php  数据表user

###-tests 后台测试目录

###-runtime  后台缓存目录(可以任意清空，请确保此目录有写的权限)

###-views  后台模板目录

--各种控制器对应的视图文件(略)

--widgets

---_flash.php  公共区域，编辑后的一次性flash session提示

---_ibox-title  公共区域，ibox-title

---_language-js.php  公共区域，js翻译对象

###-web  

--assets  发布的资源，请确保php有写的权限

--static  后台管理静态资源文件

--uploads  后台管理上传目录

--favicon  图标文件

--index.php  后台管理入口

--index-test.php  测试入口

--robots.txt  搜索引擎君子协定文件

###-widgets  后台管理小部件

--ueditor  ueditor小部件配置

---config.json ueditor小部件json配置

---UeditorAction.php  ueditor独立操作

---Uploader.php  ueditor核心php类

--ActiveField  后台管理表单字段小部件

--ActiveForm  后台管理表单form小部件

--Bar.php  后台管理列表栏按钮小部件

--Ueditor  ueditor小部件

##common  前后台公共文件夹

###-config  前后台共有配置

--bootstrap.php 初始化执行

--main.php  配置

--main-local.php  本地配置

--params.php  参数

--params-local.php  本地参数

###-helpers  辅助类

--FamilyTtree.php  求家谱树类

--FileDependencyHelper.php  文件依赖缓存文件创建修改

--StringHelper.php  字符串处理方法

###-libs  自定义三方类目录 

--Constants.php  常量类

--SimpleHtmlDom.php  php版jquery dom选择器

###-mail  邮件发送模板

--各种邮件发送的模板

###-models  公共模型

--meta

---ArticleMetaDislike.php  dislike标签

---ArticleMetaLike.php  like标签

--Article.php   数据表article

--ArticleContent.php  数据表article_content

--ArticleMeta.php  数据表article_meta

--Category.php  数据表category

--Comment.php  数据表comment

--FriendLink.php   数据表friend_link

--LoginForm.php  前台用户登陆表单

--Menu.php  数据表menu

--Options.php  数据表options

--User.php  数据表user

###-widgets  公共小部件

--Alert.php  alert小部件

--JsBlock.php  jsblock小部件

--Pjax.php  pjax小部件

###-tests 公共测试目录

##console  控制台应用

---各种控制台目录（略）

##api restful api应用

###-controllers api控制器

###-models api模型

###-config api配置

###-tests api测试

###-web api根webroot目录

###-runtime api缓存目录

##docs  github首页显示的信息

##environments  执行yii init时生成index.php的模板目录

###-dev dev环境模板

###-prod prod环境模板

##feehi  feehicms重写掉yii2的部分（这里是伪重写，仅仅是改变了资源文件的加载，方便做cdn加载资源）

###-assets  重写yii2的资源依赖，方便做cdn，其他啥也没做

###-components  重写yii2组件，啥也没做，只是改变一下加载资源，可以从cdn加载

##frontend  前台目录

###-assets  前台资源管理

--AppAsset.php  整个前台都加载的资源

--IndexAsset.php  SiteController加载的资源

--ViewAsset.php   详情页加载的资源

###-config  前台配置

--bootstrap.php  初始化

--main.php  前台配置

--main-local.php  本地前台配置

--params.php  前台params配置

--params-local.php   前台params本地配置

###-controllers  前台控制器
 
---components  前台组件

----Article.php  前台文章获取组件

---ArticleController.php  文章控制器

---PageController.php  单页控制器

---SearchController.php  搜索控制器

---SiteController.php  综合控制器，诸如登陆、注册、切换语言...

--messages  前台多语言

---zh

----frontend.php  前台所有英译汉

###-models  前台model

--Article.php  数据表article

--ArticleContent.php  数据表article_content.php

--Comment.php  数据表comment

--FriendLink.php  数据表friend_link

--Menu.php  数据表menu

--PasswordResetRequestForm.php  前台用户请求重置密码表单

--ResetPasswordForm.php  前台用户重置密码表单

--SignupForm.php  前台用户注册表单

--User.php  数据表user

--UserSearch.php  前台用户user搜索

--runtime  前台缓存目录

###-views  前台模板目录

--各种前台控制器对应的模板文件（略）

###-web  前台暴露web目录

--admin  为了解决不用单独配置域名给后台，在此处增加后台管理入口

---assets  后台管理资源发布处

---static  后台资源

---uploads  后台上传目录

---index.php  后台入口

--assets  前台资源发布处

--static  前台资源

--uploads  前台上传目录

--index.php  前台入口

--install.php  安装入口

--timthumb.php  在线截图php插件

###-widgets 前台小部件

--ArticleListView.php  文章列表小部件

--MenuView.php  前台菜单生成小部件

--ScrollPicView.php  滚动图小部件

###-tests 前台测试目录

##install  在线安装应用（本文件夹略，通过浏览器下一步安装逻辑在此）

##vendor  composer生成目录

##init  初始化yii2的脚本

##yii  yii2命令行入口

