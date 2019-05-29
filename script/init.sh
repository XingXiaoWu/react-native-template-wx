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
}

#安装link项目
function initios(){
    npm run initios
}

function addBridge () {
    yarn add react-native-wx-bridge
}

getPath
echo "1.获取当前项目路径,路径$workpath"
getTargetName $workpath
echo "2.当前项目名称:$targetName"
echo "3.添加依赖"
addBridge
initios
#echo "4.link添加依赖"
#npmlink
