/*************************************************************************************************
 * <pre>
 * @项目名称:   CssTest
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
 * @创建时间:     2019-04-29 16:17
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import {NativeModules, Platform, ToastAndroid} from "react-native";

export class Native {

    static showToast(message){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.showToast(message)
        } else {
            ToastAndroid.show(message)
        }
    }

    static showLoading(){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.showLoading()
        } else {

        }
    }

    //环形loading
    static showRingLoading(){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.showRingLoading()
        } else {

        }
    }

    static dismissLoading(){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.dismissLoading()
        } else {
            // ToastAndroid.show(message)
        }
    }

    static navigate(moduleName,fileName){
        if (Platform.OS === 'ios'){
            NativeModules.wxnative.navigate(moduleName,fileName)
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
