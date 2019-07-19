#!/bin/sh
#需要脚本替换的方法库

# 改公共库的webview
function replaceWkWebView() {
    workPath=$(pwd)
    echo $workPath
    targetPath=$workPath/node_modules/react-native-webview/ios/RNCWKWebView.m
    echo $targetPath
    #TODO 判断该行是不是目标行,如不是则不替换
    #目标代码在118行
    line=118

    targetLine="wkWebViewConfig.userContentController = \[WKUserContentController new\];"

    aaa="NSString *jScript = @\"var meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width'); document.getElementsByTagName('head')[0].appendChild(meta);\";"

    bbb="WKUserScript *wkUScript = \[\[WKUserScript alloc\] initWithSource:jScript injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:YES\];"

    ccc="wkWebViewConfig.userContentController = \[WKUserContentController new\];"

    ddd="\[wkWebViewConfig.userContentController addUserScript:wkUScript\];"

    sed -i "" "$line s/$targetLine/$aaa/g" $targetPath

    sed -i "" "$line a\ 
        \      $bbb
        " $targetPath
    # 变量自增
    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $ccc
        " $targetPath
    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $ddd
        " $targetPath
}

# todo 添加run-ios找不到的问题修复
function replaceRunIOS() {
    workPath=$(pwd)
    echo $workPath
    targetPath=$workPath/node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js

}

#改rn的webview(0.6弃用)
function replaceWkWebView2() {
    workPath=$(pwd)
    echo $workPath
    targetPath=$workPath/node_modules/react-native/React/Views/RCTWKWebView.m
    echo $targetPath
    #TODO 判断该行是不是目标行,如不是则不替换
    #目标代码在118行
    line=75

    # targetLine="wkWebViewConfig.userContentController = \[WKUserContentController new\];"

    aaa="NSString *jScript = @\"var meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width'); document.getElementsByTagName('head')[0].appendChild(meta);\";"

    bbb="WKUserScript *wkUScript = \[\[WKUserScript alloc\] initWithSource:jScript injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:YES\];"

    # ccc="wkWebViewConfig.userContentController = \[WKUserContentController new\];"

    ddd="\[wkWebViewConfig.userContentController addUserScript:wkUScript\];"

    # sed  -i "" "$line s/$targetLine/$aaa/g" $targetPath

    sed -i "" "$line a\ 
        \      $aaa
        " $targetPath
    # 变量自增
    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $bbb
        " $targetPath
    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $ddd
        " $targetPath
}

# 修改跳转ios的https认证
function replaceToSkipHttpsiOS() {
    workPath=$(pwd)
    targetPath=$workPath/node_modules/react-native/Libraries/Network/RCTHTTPRequestHandler.mm
    echo $targetPath

    #目标代码在118行
    line=167
    describe='// RCTHTTPRequestHandler.m 文件遵循NSURLSessionDataDelegate协议，实现方法，从代码上直接信任绕过验证'
    funcName='- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(nonnull NSURLAuthenticationChallenge *)challenge completionHandler:(nonnull void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential * _Nullable))completionHandler{'
    funcBody=' completionHandler(NSURLSessionAuthChallengeUseCredential,[NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust]);'
    end='}'

    sed -i "" "$line a\ 
        \      $describe
        " $targetPath

    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $funcName
        " $targetPath

    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $funcBody
        " $targetPath

    line=$(($line + 1))
    sed -i "" "$line a\ 
        \      $end
        " $targetPath
}

#往pod中添加需要初始化的三方库
function replacePod() {
    workPath=$(pwd)
    targetPath=$workPath/ios/Podfile
    echo $targetPath
    # cd $targetPath
    lf=$'\n'
    # ; echo 'foo bar' | sed "s/ /\\$lf/g"
    #从30行开始插入
    sentence="pod 'RNCshBridge', :path => '../node_modules/react-native-csh-bridge/ios/RNCshBridge.podspec'"
    sentence1="pod 'RNCsshotelComponent', :path => '../node_modules/react-native-csshotel-component/ios/RNCsshotelComponent.podspec'"
    sentence2="pod 'BVLinearGradient', :path => '../node_modules/react-native-linear-gradient/BVLinearGradient.podspec'"
    sentence3="pod 'RNCAsyncStorage', :path => '../node_modules/@react-native-community/async-storage/RNCAsyncStorage.podspec'"
    sentence4="pod 'RNGestureHandler',:path => '../node_modules/react-native-gesture-handler/RNGestureHandler.podspec'"
    sentence5="pod 'react-native-webview',:path => '../node_modules/react-native-webview/react-native-webview.podspec'"
    sentence6="pod 'rn-fetch-blob',:path => '../node_modules/rn-fetch-blob/rn-fetch-blob.podspec'"
    sed -i "" "30 a\ 
    \ $sentence \\$lf     $sentence2    \\$lf      $sentence3    \\$lf      $sentence4    \\$lf       $sentence5    \\$lf       $sentence6       
    " $targetPath
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
    replace_sentence="CsViewCtrl *ctrl = [[CsViewCtrl alloc]initWithModuleName:@\"$2\" fileName:@\"$2\" params:launchOptions];"
    sed -i "" "25s/$target_sentence/$replace_sentence/g" $oldm
    # 替换完毕
}
