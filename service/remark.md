# 路由规则：

1、所有路由根目录由/service目录开始

2、子目录会被解析为子路由，比如目录/service/child-router会被解析为路由/child-router

3、只有js文件且导出为函数的文件才会被解析为路由，文件名规则如下：

[路由方法]-[路由名]_动态路由

其中：

路由方法只能是get、post、options、head、put、patch、delete之一

路由名不应含有下划线_，否则会被解析为动态路由，如果需要，可用中划线-

动态路由为可选，格式为下划线_+动态参数名

动态路由只能放在最后的部分


举例：

文件/service/get-user会被解析为路由：GET /user

文件/service/user/post-new-user解析为路由:POST /user/new-user

文件/service/delete-user_id解析为路由:DELETE /user/:id

代码约定：

js文件应包含请求拦截器request、服务service、控制器controller三个方法，并且导出controller方法,具体写法详见模板文件。
