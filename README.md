# 公司内部匿名交流平台

> 真匿名，每次都可以选择随机花名。

不记录ip、不保存cookie、没有session、不追踪隐私。

### mongodb 连接

api/app.rb line 11

```
client = Mongo::Client.new(["localhost:27017"],user: "admin",password: "123456")
```

改成你自己的 mongodb 用户名密码。

### mongodb 设置

建立 一个 名为 community 的 Database ，建立 3 个 Collection：

topics

replys

users

导入 users/users.json 到 Collection users

### 安装及启动 api

```
cd api
bundle install
ruby app.rb
```

### 安装 web
```
cd web
yarn install
yarn start
```



### 部署（ubuntu环境）

1 build web
```
cd web
yarn build
```

2 新建某个目录，如 /home/ubuntu/web

把 build 的文件，拷贝到 /home/ubuntu/web 文件夹下。
把 users 目录下的 avatar 拷贝到 /home/ubuntu/web 文件夹下。

3 配置 nginx ，可参考 nginx.md

