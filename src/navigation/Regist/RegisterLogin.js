/*************************************************************************************************
 * <pre>
 * @项目名称:   react-native-template-wx
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:    登录页路由
 * @版本:
 * @作者:         wuxing
 * @邮箱:         329106954@qq.com
 * @创建时间:     2019-04-04 14:21
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component} from 'react';
import {createStackNavigator} from "react-navigation";
import {LoginView} from "../../pages/Login/LoginView";
import {NavigationConfig} from "..";

export let AppLoginNav = createStackNavigator({
    LoginView: {
        screen: LoginView,
        navigationOptions: () => {
            return {
                headerTitle: "登录"
            }
        }
    },
}, {
    initialRouteName: "LoginView",
    defaultNavigationOptions:({screenProps})=>NavigationConfig.navConfig(screenProps)
})