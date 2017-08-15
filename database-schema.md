#数据库设计

##数据表 admin_log  管理员操作日志

id 自增id

user_id 管理员用后id

route  管理员操作的路由

description  管理员操作的描述

created_at  创建时间

updated_at  修改时间


##数据表admim_role_permission  各角色所拥有的权限

id 自增id

role_id 角色id

menu_id 菜单id

created_at  创建时间

updated_at  最后修改


##数据表admin_role_user  后台管理员所属角色

id 自增id

uid 管理员用户id

role_id 角色id

created_at 创建时间

updated_at 最后修改


##数据表admin_roles  角色

id 自增id

parent_id 父角色id

role_name 角色名称

remark 角色备注

created_at 创建时间

updated_at 最后更新


##数据表admin_user 后台管理员

id 自增id

username 管理员用户名

auth_key 加密钥匙

password_hash 管理员密码

password_reset_token 重置密码token

email 管理员邮箱 

avatar 管理员头像地址

status 管理员状态

created_at 创建时间

updated_at 最后修改


##数据表article  文章

id 自增id

cid 所属分类id

type  类型（1为文章，2为单页）

title 文章标题

sub_title 文章副标题

summary 文章概要

thumb 缩略图

seo_title seo标题

seo_keywords seo关键词

seo_description seo描述

status 文章状态

sort 文章排序

author_id 文章发布者id

author_name 文章发布者用户名

scan_count  浏览次数

comment_count  评论次数

can_comment  文章是否允许评论

visibility 文章可见性（1为可见，2为评论可见，3为输入密码可见）

tag 文章标签

flag_headline 头条标签

flag_recommend 推荐标签

flag_slide_show 幻灯标签

flag_special_recommend 特别推荐标签

flag_roll 滚动标签

flag_bold 加粗标签

flag_picture 图片标签

created_at 创建时间

updated_at 最后修改


##数据表article_content  文章内容

id 自增id

aid 文章id

content  文章详细内容


##数据表article_meta 文章自定义标签

id 自增id

aid 文章id

key  标签名称

value 标签值

ip 来源ip

created_at 创建时间


##数据表category 文章分类

id 自增id

parent_id 父分类id

name 分类名称

sort 分类排序

remark 分类备注

created_at 创建时间

updated_at  修后修改


##数据表comment 评论表

id 自增id

aid  文章id

uid  评论用户uid

admin_id 管理员uid

reply_to 回复给谁的uid

nickname  评论人用户名

email  评论人邮箱

website_url 评论人网址

content  评论内容

ip 评论来源ip

status  评论状态

created_at 创建时间

updated_at 最后修改


##数据表friend_link 友情链接

id 自增id

name 友情链接名称

image 友情链接图片地址

url 友情链接地址

target  是否在新窗口中打开

sort  友情链接排序

status 友情链接状态

created_at 创建时间

updated_at 最后修改


##数据表menu  前后台菜单

id 自增id

type 菜单类型（前台/后台菜单）

parent_id 父菜单id

name 菜单名称

url 菜单url地址

icon 菜单图标

sort 菜单排序

target 菜单打开方式（是否新窗口）

is_absolute_url 菜单地址是否绝对地址

is_display 菜单是否显示

method 菜单请求方式(get/post)

created_at 创建时间

update_at 最后修改


##数据表options 配置项

id 自增id

type  类型

name 名称

value  值

input_type 输入框类型

autoload 是否自动载入

tips 提示信息

sort 排序


##数据表user  前台用户

id 自增id

username  用户名

auth_key 加密钥匙

password_hash 密码

password_reset_token 重置密码token

email 邮箱

avatar 头像地址

status 状态

created_at 创建时间

updated_at 修改时间
