#!/bin/sh
    # 遍历的示例demo
    # workdir=$(pwd)
    # echo "当前目录$workdir"
    # echo echo
    # # 遍历当前目录下的文件名
    # for file in `ls $workdir`
    # do
    #     echo "$file"
    #     if [[ $file == *.xcodeproj ]]; then
    #         echo "匹配成功$file"
    #         #目标文件
    #         # target_name="$file"
    #         # 去除后缀
    #         target_name="${file%.*}"
    #         break
    #     fi
    # done

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

#安装link项目
function npmlink(){
    react-native link
}
#替换ios的appdelegate文件
#参数要求:1:workpath 2:targetName
function replaceAppdelegate(){
    #1.定义新旧文件
    #1.定义新旧文件
    newh=$1/iosReplace/AppDelegate.h
    newm=$1/iosReplace/AppDelegate.m
    oldh=$1/ios/$2/AppDelegate.h
    oldm=$1/ios/$2/AppDelegate.m
    #2.拷贝并替换文件
    cp $newh $oldh
    cp $newm $oldm
    echo "替换完毕,删除待替换文件"
    rm -r $1/iosReplace/
    # 3.替换appdelegate.m里的语句
    target_sentence="replace"
    replace_sentence="WXRNViewCtrl *ctrl = [[WXRNViewCtrl alloc]initWithModuleName:@\"$2\" fileName:@\"$2\" params:launchOptions];"
    sed -i "" "25s/$target_sentence/$replace_sentence/g" $oldm
    # 替换完毕
}

#添加pod,
#参数要求:1:workpath 2:targetName
function addPod(){
    cd $1/ios
    pod init
    if test -e ./Podfile
    then
        echo "当前项目名为:$2"

        #1.删除不必要行
        sed  -i "" "10,\$d"  ./Podfile

        #2.在最后添加
        replace_sentence="pod 'MBProgressHUD', '~> 1.1.0'"
        replace_end="end"

        #两次添加
        sed -i "" "\$a\ 
        $replace_sentence
        "   ./Podfile

        sed -i "" "\$a\ 
        $replace_end
        "   ./Podfile
        #3. pod install
        pod install
        echo "一切都搞定了,开始运行iOS项目看下"
    else
        echo 'pod init失败,检查是否安装cocoapods!'
    fi

    # # sed用法进行替换
    # # target 'demo' do
    # #目标语句,
    # target_sentence="target '$target_name' do"
    # echo "目标语句$target_sentence"
    # #替换内容
    # #可用1
    # # replace_sentence="$target_sentence \\\n  pod 'MBProgressHUD', '~> 1.1.0'"
    # replace_sentence="pod 'MBProgressHUD', '~> 1.1.0'"
    # #替换的目录
    # #可用1
    # # sed -i "" "s/$target_sentence/$replace_sentence/g" ./Podfile
    # #可用2
    # sed -i "" "/$target_sentence/a\ 
    #     $replace_sentence
    # "   ./Podfile

    # echo "开始pod install"
    # pod install
}



#echo "1.获取当前项目路径"
getPath
#echo "获取成功,路径$workpath"
# targetName=${workpath##*/}
getTargetName $workpath
#echo "2.当前项目名称:$targetName"
#echo "3.准备link项目"
npmlink
#echo "link完毕,理论上没报错"
echo "4.替换ios的启动文件"
replaceAppdelegate $workpath $targetName
#echo "5.给ios加pod"
#addPod  $workpath $targetName
echo "执行完毕,打开ios项目启动看下"