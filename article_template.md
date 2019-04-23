#模版

>**[info]2.0.7版本新增模版指定**

##文章分类页
首先写好分类页模版，然后在common/config/params.php中配置
```php
    'category.template.directory' => [//分类列表页模版
        Yii::getAlias("@frontend/views/article/index.php") => "默认",
        Yii::getAlias("@frontend/views/自定义列表.php") => "自定义",
    ],
```
如此配置后，在后台分类创建/编辑页的分类模版中将会出现自定义选项，选择自定义保存后。前台点击此分类将会以此模版显示

##文章详情页
首先写好文章详情模版，然后在common/config/params.php中配置
```php
    'article.template.directory' => [//文章模版
        Yii::getAlias("@frontend/views/article/view.php") => "默认",
        Yii::getAlias("@frontend/views/自定义文章详情.php") => "自定义",
    ],
```

如此配置后  
  1. 在后台分类创建/编辑页的分类**文章模版**中将会出现自定义选项，选择自定义保存后。所有属于此分类的文章详情页均以此模版显示
  2. 在后台文章创建/编辑页的文章中将会出现自定义选项，选择自定义保存后，此篇文章详情将以此模版展示(如文章所属分类也设置了模版，会覆盖分类的设置)

##单页
首先写好单页模版，然后在common/config/params.php中配置
```php
    'page.template.directory' => [//单页模版
         Yii::getAlias("@frontend/views/page/view.php") => "默认",
        Yii::getAlias("@frontend/views/自定义单页.php") => "自定义",
    ],
```
如此配置后，在后台单页创建/编辑页的模版中将会出现自定义选项，选择自定义保存后。前台点击此单页将会以此模版展示

>以上3种模版，FeehiCMS均有默认模版，如果没有设置，将会以默认模版展示

