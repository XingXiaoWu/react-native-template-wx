#!/bin/sh
#本脚本只是用来打包的

#定义变量workpath标示当前脚本所处位置
workpath="当前项目所处位置"
targetName="当前项目名称"
#获取当前项目所处位置
function getPath(){
    workpath=$(pwd)
}
# 获取当前项目名称
#参数要求:1:workpath
function getTargetName(){
    targetName=${1##*/}
    #echo "$1" # arguments are accessible through name, echo "$1" # arguments are accessible through , ,...,...
}

# 为打包创建文件夹
#参数要求:1:workpath
function mkbundledir () {
    # 当前目录
    cd $1/ios
    #监测目录是否存在
    if test -e $1/ios/webapp
    then
        echo "已存在webapp目录"
    else
        # 创建目录
        mkdir webapp
    fi
    #创建项目目录
    cd $1/ios/webapp
    mkdir $2
}

#真正的打包
#参数要求:1:workpath 2.targetName
function iosbundle(){
    path=$1/ios/webapp/$2
    react-native bundle --entry-file index.js --bundle-output $path/$2.jsbundle --platform ios --assets-dest $path --dev false
}


echo "1.获取当前项目路径"
getPath
echo "获取成功,路径$workpath"
# targetName=${workpath##*/}
getTargetName $workpath
echo "2.当前项目名称:$targetName"
echo "3.创建模块打包路径"
mkbundledir $workpath $targetName
echo "4.开始打包"
iosbundle $workpath $targetName
