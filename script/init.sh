# 步骤:
# 1.添加自己的依赖库
# 2.link所有库
# 3.替换appdelegate
# 4.替换wkwebview
# 5.pod待定

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

#初始化rn项目
function initreactnative () {
    yarn add react-native-wx-bridge
    yarn add react-native-wx-component
}

#初始化ios
function initios(){
    npm run initios
}


echo "获取当前项目路径,路径$workpath"
getPath
echo "当前项目名称:$targetName"
getTargetName $workpath

echo "初始化rn项目"
initreactnative
echo "初始化ios"
initios

#echo "替换需要替换的库"
#source $workpath/script/replaceFun.sh
#replaceWkWebView

