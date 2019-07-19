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

#安装link项目(弃用)
function npmlink(){
    react-native link
}


#添加pod(弃用)
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



getPath
getTargetName $workpath


# npmlink
# 1.添加pod install
source $workpath/script/replaceFun.sh
replacePod

# 2.pod install
cd $workpath/ios
pod install

# 3."替换ios的启动文件"
replaceAppdelegate $workpath $targetName

cd $workpath
# 4."替换wkwebview"
echo "替换wkwebview"
replaceWkWebView

# 5.放开对ios的http限制
echo "放开对ios的http限制"
replaceToSkipHttpsiOS