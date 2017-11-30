#JS操作

>**[info]FeehiCMS继承了所有yii2框架的js效果。同时FeehiCMS本身也提供了一些js操作，为了您更快速的复用这些js操作，推荐您认真阅读本页内容。**

本文档描述的js效果均仅限于FeehiCMS后台

FeehiCMS提供的功能均在backend/web/static/js/feehi.js文件内**

##确认效果
此效果为重写yii2的确认框效果，使框效果更美观。
```php
    Html::a('<i class="glyphicon glyphicon-trash" aria-hidden="true"></i> ' . Yii::t('app', 'Delete'), $url, [
        'title' => Yii::t('app', 'Delete'),
        'data-confirm' => Yii::t('app', 'Are you sure you want to delete this item?'),
        'data-method' => 'post',
        'data-pjax' => '0',
        'data-params' => '{json}'
        'class' => 'btn btn-white btn-sm',
    ]);
```
如上，给html a元素一个data-confirm属性，当点击此链接时不会跳转页面，而是会弹出一个确认窗，窗口询问data-confirm的内容，窗口标题为title，点击取消则取消操作，当点击确定时才进行ajax操作。

具体ajax动作可以通过
   * data-method 提交方式  get/post 默认post
   * data-pjax 是否pjax提交 0(否)/1(是) 默认0
   * data-params json字符串  需要ajax提交的数据 默认为空

##批量操作
此效果常见于列表页，如批量删除
```php
Html::a('<i class="fa fa-trash-o"></i> ' . yii::t('app', 'Delete'), Url::to(['delete']), [
    'title' => yii::t('app', 'Delete'),
    'data-pjax' => '0',
    'param-sign' => 'id',
    'data-confirm' => yii::t('app', 'Realy to delete?'),
    'class' => 'btn btn-white btn-sm multi-operate',
]);
```

如上，给html元素一个multi-operate class，当点击此元素时，会把各个tr td元素下的input[type=checkbox] :checked的复选框的值,用逗号连接成一个字符串，并赋值给param-sign后以这个param-sign作为请求参数发起ajax请求。

具体ajax动作可以通过
   * data-method 提交方式  get/post 默认post
   * href 需要提交到的地址，即form中的action参数
   * param-sign 拼接id后的key名，默认为id，即默认可以在后端$_POST['id']获取1,2,3这样的字符串

>注意:有时当获取了选中的id后还需要进一步的处理才ajax请求，比如把选中的选项加入到某个分类里面，这个时候需要做的是跳分类选择页面而不是ajax，那么再给一个class即在multi-operate后面加jump，就会带上id参数跳转页面而不是ajax了。


##在iframe中点击元素打开新tab
如在文章列表页，点击元素打开一个新的tab窗口
```php
    <a class="openContab" title="<?=yii::t('app', 'Comments')?>" target="_blank" href="<?=Url::to(['comment/index'])?>"><?=yii::t('app', 'More')?></a>
```
达到此效果只需要给此元素一个class为openContab，指定tab新窗口的标题为title属性，指定新窗口的链接地址为href
注：并不仅限于a元素，任意元素只要给class为openContab，给出title href title属性皆可打开新tab

##去掉提交表单默认的loading效果
为了保证在网络较差情况下，用户多次点击提交按钮，FeehiCMS默认点击后立即禁用此按钮并显示loading效果。
如果个别表单不需要此效果可以给form一个class为none-loading即可