


## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


##  文件服务操作

nest g [文件类型] [文件名] [文件目录（src目录下）]

nest g service user logical

nest g controller user logical




##  生成一个模块

nest g resource


nest g resource 【名称】 --no-spec


nest g co user
nest g mo user
nest g s user
nest g resource user --no-spec
##



# npm config set registry https://registry.npmmirror.com



安装依赖慢，如何解决？
可能您刚接触到 pure-admin 会有个疑问，为什么平台使用了 pnpm 可是安装平台依赖的时候还是等了很长时间呢？

答：首先我觉得您可以认真看下 pnpm 哦。其次，pnpm 只会在项目依赖包从本地找不到对应版本的情况下，才会去 npm (opens new window)下载，既然是 npm 下载的话，它肯定是国外镜像，下载慢就很正常了。下面讲下解决办法：

① 使用下面命令查看当前 npm 源

npm config ls
执行完上面的命令后，在您没有设置过任何源的情况下，默认是 npmjs (opens new window)官方源，如下图

npm

② 不管是什么源，我们都可以不用管，直接执行下面命令即可

npm config set registry https://registry.npmmirror.com
上面的命令是将本地的源换成国内源 npmmirror (opens new window)，经过几轮测试，发现它的下载速度快且同步率高，同步频率 10 分钟一次，如果您之前的源是这个 http://registry.npm.taobao.org ，那您必须换成 npmmirror 啦，因为原淘宝 npm 域名即将停止解析 具体了解(opens new window)
执行完上面的命令后再使用 ① 中的命令查看本地源，如下图

npm

③ 当我们将本地源换成 npmmirror 后，再回到 pure-admin 平台，将 pnpm-lock.yaml 和 node_modules 这两个文件删除，然后执行下面的命令重新安装依赖，您就会发现安装速度很快啦

pnpm install
如果您不删除上面提到的两个文件就会遇到如下图的报错

npm

提示

如果您本地有自己维护的 npm 包，请在发包前使用下面命令将本地源换成 npm 官方源，这样才能保证您发包成功，发完之后再换成 npmmirror 源即可。同理，如何您公司有私服的话，也是如此操作，只不过把下面命令 registry 后的地址换成私服的地址即可。如何部署私服可参考 该文章(opens new window)

npm config set registry https://registry.npmjs.org
当然第二种办法也是最方便的办法就是将下面代码加入到您自己库的 package.json 里 查看具体参考(opens new window)

"publishConfig": {
  "registry": "https://registry.npmjs.org/"
}