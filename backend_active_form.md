#后台表单输入框

>**[info]该小部件继承yii\widgets\ActiveField,所以yii2框架自带的输入框均包含在内，部分被cms重写了**

```php
//示例用法
    $form = backend\widgets\ActiveForm::begin([
        'options' => [
            'enctype' => 'multipart/form-data',
            'class' => 'form-horizontal'
        ]
    ]);
    
    echo $form->field($model, 'tag')->textInput();//文本输入框
    echo $form->field($model, 'can_comment')->dropDownList(Constants::getYesNoItems());//select选框
    backend\widgets\ActiveForm::end();
```

##checkbox
单个复选框

##dropDownList
下拉select选框

##chosenSelect
美化过的下拉select选框，支持搜索、多选等操作。详见https://harvesthq.github.io/chosen/options.html

##readOnly
文本框，设置了readonly属性

##rationList
多个单选框

##checkboxList
多个复选框

##textarea
多行文本框，html textarea标签

##fileInput
美化后的文件输入框

##imgInput
图片文件输入框，选择图片文件后会自动展示预览图片

##ueditor
百度富文本编辑器。详见https://ueditor.baidu.com

##date
日期输入框，包含时间、时间范围选择。详见https://www.layui.com/doc/modules/laydate.html

##其他
所有yii2框架有的表单小部件，该类继承自yii\widgets\ActiveField
