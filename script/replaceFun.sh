#!/bin/sh
#需要脚本替换的方法库


function replaceWkWebView () {
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
    
    sed  -i "" "$line s/$targetLine/$aaa/g" $targetPath

    sed -i "" "$line a\ 
        \      $bbb
        "   $targetPath
    # 变量自增
    line=$(($line+1))
    sed -i "" "$line a\ 
        \      $ccc
        "   $targetPath
    line=$(($line+1))
    sed -i "" "$line a\ 
        \      $ddd
        "   $targetPath
}