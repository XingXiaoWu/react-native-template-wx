function yarnInstall () {
    yarn
}
#脚本所在文件夹
scriptPath=$(pwd)/script
source $scriptPath/replaceFun.sh
yarnInstall
replaceWkWebView

