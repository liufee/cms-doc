#模型


##common/models
common/models存放的是各个应用公有的数据表模型,一般用gii生成,也可以手写。各方法的含义，以及在哪个时候会被调用到与yii2完全一致，这里强烈建议需要熟读yii2文档用好这些方法，可以事半功倍。以下仅介绍feehicms使用到的部分方法。

1. 模型都需都继承自\yii\db\ActiveRecord类(提供数据库的增删改查操作),而\yii\db\ActiveRecord继承自\yii\base\Model提供表单验证模型填充等

2. 为当前model添加一个TimestampBehavior行为，使当前模型在插入数据库时自动填充created_at字段、修改当前模型到数据库时自动填充updated_at字段。当然你也可以添加其他更多yii2自带或者自己创建的行为
    ```php
     public function behaviors()
     {
        return [
            TimestampBehavior::className(),
        ];
     }
    ```
    
3. 指定数据表名称
  ```php
     public static function tableName()
     {
         return '{{article}}';
     }
  ```
  使用{{article}}(请心里默认在article前面加个%，markdown语法有冲突编不上去)意为任意字符开头以article结尾的数据表，常用于有表前缀的场景;也阔以直接return 'article'不适用表前缀
  
4. 表单提交数据校验规则
    ```php
    public function rules()
    {
        return [
            [['cid', 'type', 'status', 'sort', 'author_id', 'can_comment', 'visibility'], 'integer'],
        ];
    }
    ```
    以上规则表示，提交表单时$model->validate()会验证规则，cid type status数据必须是整形数字，更多yii2自带验证规则请直接查阅yii2文档
    >**[info]这里有个坑，你必须配置数据库字段的验证规则，$model->load(yii::$app->getRequest()->post()表单数据到模型的时候才会填充此数据库字段**

5. 使用场景
    ```php
    public function scenarios()
    {
        return [
            'register' => ['nickname','email', 'password'],
            'update' => ['nickname'],  
        ]
     }
    ```
    默认有一个default场景即只有一个场景时，不需要复写此方法。
    以上申明了两个场景，注册和更新资料，注册时用户名、邮箱、密码、昵称都是需要填写的，但是在更新资料时只需要更新昵称其他三个不需要修改。此处要搭配rules验证使用

6. 指定标签名称
    ```php
   public function attributeLabels()
   {
       return [
           'id' => Yii::t('app', 'ID'),
           'cid' => Yii::t('app', 'Category Id'),
           'type' => Yii::t('app', 'Type'),
       ]
    }
    ```
    利用yii2生成的html如$form->field($model, 'field'')->textInput的时候，自动把数据库字段换成其他名称显示。
    yii::t()静态方法直为使用多语言，如果无需多语言直接使用 return ['cid'=>'分类']即可
    
7. 一对多，多对多，多对一关系，beforeFind afterFind beforeValidate...请直接阅读yii2官方文档

##backend/models
后台应用需要操作某个数据表在此新建一个模型使之继承自common\models。仅在后台使用到的方法写在此里面，如
```php
    namespace backend\models;
    class Article extens \common\models\Article
    {
        ...后台独有的方法
    }    
```
如果某个表仅仅用于后台一个应用那么直接创建模型在此处。如
```php
    namespace backend\models;
    class Adminlog extens \yii\db\ActiveRecord
    {
        ...
    }    
```

##frontend/models
与backend\models一致

##api/models
与backend\models一致