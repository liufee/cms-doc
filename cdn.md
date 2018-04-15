#CDN配置
>[info]从2.0.2版本开始增加对cdn支持。支持腾讯云、网易云、七牛、阿里云**

1.关闭cdn(默认)
```php
    'cdn' => [
        'class' => feehi\cdn\DummyTarget::className(),//不使用cdn，注：此处配置host无效，被自动配置成后台填写的域名
    ],
```

2.使用七牛
```php
    'cdn' => [
        'class' => feehi\cdn\QiniuTarget::className(),
        'accessKey' => '七牛key',
        'secretKey' => '七牛secret',
        'bucket' => '七牛bucket',
        'host' => '七牛cdn域名',
    ],
```

3.使用腾讯云
```php
    'cdn' => [
        'class' => feehi\cdn\QcloudTarget::className(),
        'region' => '腾讯云region',
        'appId' => '腾讯云appId',
        'secretId' => '腾讯云secretId',
        'secretKey' => '腾讯云secretKey',
        'bucket' => '腾讯云bucket',
        'host' => '腾讯云cdn域名',
    ],
```

4.使用网易云
```php
    'cdn' => [
        'class' => feehi\cdn\NeteaseTarget::className(),
        'accessKey' => '网易appKey',
        'accessSecret' => '网易accessSecret',
        'endPoint' => '网易endPoint',
        'bucket' => '网易bucket',
        'host' => '网易cdn域名',
    ],
```

5.使用阿里云
```php
    'cdn' => [
        'class' => feehi\cdn\AliossTarget::className(),
        'accessKey' => '阿里云appKey',
        'accessSecret' => '阿里云accessSecret',
        'endPoint' => '阿里云endPoint',
        'bucket' => '阿里云bucket',
        'host' => '阿里云cdn域名',
    ],
```