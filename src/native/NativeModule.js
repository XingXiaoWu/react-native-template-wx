/*************************************************************************************************
 * <pre>
 * @项目名称:   react-native-template-wx
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:
 * @版本:
 * @作者:         wuxing
 * @邮箱:         329106954@qq.com
 * @创建时间:     2019-04-29 16:17
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import {NativeModules, Platform} from "react-native";

export class Native {

    /**
     * 
     * @param {*} moduleName 模块注册名,去index.js看
     * @param {*} fileName 打包出来的文件名称,如果使用的是wx脚本提供的打包命令,会和moduleName相同
     * @param {*} params 可选项,可不填.需要传递给将要打开的bundle的参数
     */
    static navigate(moduleName,fileName,params){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.navigate(moduleName,fileName,params)
        } else {
            // ToastAndroid.show(message)
        }
    }

    static popViewCtrl(){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.popViewCtrl()
        } else {
            // ToastAndroid.show(message)
        }
    }
}
