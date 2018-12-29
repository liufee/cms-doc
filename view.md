#视图

>**[info]以下描述针对yii2默认配置，这些都有参数可以配置改变的，具体查看yii2官方文档***

##views/layouts/main.php
每个控制器$this->render()都会渲染这个公共的布局。也阔以在控制器中使用$this->renderPartial()不渲染此布局文件。

##views/控制器名/action指定的模板名称
feehicms内置了一些常用的widgets来快速生成列表、操作按钮...具体查看本文档widgets章节