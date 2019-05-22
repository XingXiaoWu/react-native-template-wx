
# react-native-template-wx

## 介绍
使用本脚手架生成的项目,将自动集成如下东西

1.react-navigation  3.x版本,并写好了路由的示例代码

2.mobx  5.x版本

3.fetch工具类      写好了get,post,postFrom,支持超时

4.全局Toast       不用写Toast组件,直接使用类方法即可调用

5.全局Loading     不用写Loading组件,直接使用类方法即可调用,iOS上使用的是'MBProgressHUD', '~> 1.1.0'"

6.rn-fetch-blob     用于下载,写好了一个下载bundle的方法

7.iOS原生工程做了改动 支持不同rn分开打包加载,并可以通过fetch-blob下载(意思就是可以把bundle放在服务端,直接下载加载在打包好的ipa包,可以理解为一个简约的热更新)

## 预备工作
目前只做好了iOS,安卓还在学习中
### iOS
默认为 你使用的是mac,已经安装好了react-native-cli,cocoapods,xocde
1.新建项目
```
react-native init 项目名 --template wx
```
2.新建的项目中会有个scripts.json,请将里面的命令复制到package.json的scriptsk代码块中
```
cd 项目根目录下
npm run initios
```
等执行完毕,就可以打开iOS项目直接运行了
