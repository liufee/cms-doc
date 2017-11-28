#多语言
FeehiCMS默认使用的多语言技术php file，你也可以自己修改成db实现

##配置
   ```php
   'language' => 'zh-CN',//设置默认显示语言，如果session记住了上次选择的语言用程序覆盖此值即可实现多语言
   'components' => 
    [
      'i18n' => [
           'translations' => [//多语言包设置
               'app*' => [//yii::t('app', 'name')对应app开头的，去如下fileMap的文件中去查找
                   'class' => yii\i18n\PhpMessageSource::className(),//使用php file方式提供多语言
                   'basePath' => '@backend/messages',//应用多语言翻译的目录
                   'sourceLanguage' => 'en-US',//程序语言，如yii::t('app', 'Catetgory')
                   'fileMap' => [
                       'app' => 'app.php',
                       'app/error' => 'error.php',
                   ],
               ],
               'menu' => [//对应yii::t('menu', 'name')开头的，去如下fileMap文件中去查找
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
   ```
   
##使用
   
   在需要使用的地方
   ```php
      yii::t('app', 'name');
   ```
   然后在messages/zh/app.php中写
   ```php
      return [
          'name' => '名称'
      ];
   ```