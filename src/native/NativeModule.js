/*************************************************************************************************
 * <pre>
 * @项目名称:   无星的脚手架
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:
 * @版本:         V2.0.0
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
import {Platform,} from "react-native";
import {navigate,popViewCtrl} from "react-native-csh-bridge"
import {Toast,Loading} from "react-native-csshotel-component"
export class Native {

    static showToast(message){
        Toast.showToast(message)
    }

    static showLoading(){
        Loading.showLoading()
    }

    static dismissLoading(){
        Loading.dismissLoading()
    }

    /**
     * 
     * @param {*} moduleName 模块注册名,去index.js看
     * @param {*} fileName 打包出来的文件名称,如果使用的是wx脚本提供的打包命令,会和moduleName相同
     * @param {*} params 可选项,可不填.需要传递给将要打开的bundle的参数
     */
    static navigate(moduleName,fileName,params){
        if (Platform.OS === 'ios'){
            navigate(moduleName,fileName,params)
        } else {
            navigate(moduleName,fileName,params)
        }
    }

    static popViewCtrl(){
        if (Platform.OS === 'ios'){
            popViewCtrl()
        } else {
            // ToastAndroid.show(message)
        }
    }
}
