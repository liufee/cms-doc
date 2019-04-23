#gii生成代码

>FeehiCMS基于Yii2，与yii2 gii生成代码一致。因为代码生成比较敏感，所以需要设置白名单方可执行，默认允许127.0.0.1执行生成。详细配置请参见[yii2 gii文档章节](https://www.yiichina.com/doc/guide/2.0/start-gii)

##gii生成前台代码
FeehiCMS可以生成前台代码，但是前台交互多样，不建议用gii生成。略

##gii生成后台代码
FeehiCMS后台有自己的ui风格，所以FeehiCMS提供了一个自己的gii模版，并且默认就是以此模版生成。 

1. 访问http://xxx.com/admin?r=gii
>如果报错，请先按照yii2 gii文档章节正确配置gii模块，并设置允许该ip访问gii

2. 选择Model Generator  
   填入表名  
   模型类名(无需命名空间)  
   默认的Namespace为common\models一般无需更改，点击Preview后再点击Generate

3. 再次访问http://xxx.com/admin?r=gii,选择CRUD Generator:  
   填写Model Class(含命名空间,如common\models\Xxx)
   填写Search Model Class(含命名空间,如backend\models\search\XxxSearch),此文件无需手动创建,而是由gii自动创建  
   填写Controller Class(含命名空间,如backend\controllers\XxxController)  
   填写View Path(使用绝对路径或者别名,推荐别名,如@backend/views/xxx)  
   点击Preview后再按Generate
   

此时,基于此表的增、删、改、查都以开发完毕。

愉快的访问一下http://xxx.com/admin?r=xxx查看一下效果吧 

>当然程序自动生成的代码，并不会特别完美，有些细节，比如输入框类型之类、默认展示字段可能不是你想要的，需要做微调。