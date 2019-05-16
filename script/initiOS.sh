#!/bin/sh
cd ./ios

echo "查看下当前目录是否正常"

# touch Podfile
pod init

echo "查看下当前目录podinit是否成功"

if test -e ./Podfile
then
    # 当前目录
    workdir=$(pwd)
    echo "当前目录$workdir"
    echo echo
    # 遍历当前目录下的文件名
    for file in `ls $workdir`
    do
        echo "$file"
        if [[ $file == *.xcodeproj ]]; then
            echo "匹配成功$file"
            #目标文件
            # target_name="$file"
            # 去除后缀
            target_name="${file%.*}"
            break
        fi
    done

    echo "当前项目名为:$target_name"

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

:<<BLOCK
    # 进行替换
    # target 'demo' do
    #目标语句,
    target_sentence="target '$target_name' do"
    echo "目标语句$target_sentence"
    #替换内容
    #可用1
    # replace_sentence="$target_sentence \\\n  pod 'MBProgressHUD', '~> 1.1.0'"
    replace_sentence="pod 'MBProgressHUD', '~> 1.1.0'"
    #替换的目录
    #可用1
    # sed -i "" "s/$target_sentence/$replace_sentence/g" ./Podfile
    #可用2
    sed -i "" "/$target_sentence/a\ 
        $replace_sentence
    "   ./Podfile

    echo "开始pod install"
    pod install
BLOCK
else
    echo 'pod init失败,检查是否安装cocoapods!'
fi
