/*************************************************************************************************
 * <pre>
 * @项目名称:   2.0.0
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:    App内容页
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
 * @创建时间:     2019-04-04 14:21
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component} from 'react';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import {HomeView} from "../../pages/Home/HomeView";
import {MyView} from "../../pages/My/MyView";

//首页
let HomeNav = createStackNavigator({
    HomeView: {
        screen: HomeView,
        navigationOptions: () => {
            return {
                headerTitle: "homeView"
            }
        }
    }
})

//我的
let MyNav = createStackNavigator({
//TODO:更正
    MyView: {
        screen: MyView,
        navigationOptions: () => {
            return {
                headerTitle: "MyView"
            }
        }
    }
})
//定义一些icon

// Tab定义
let AppTab = createBottomTabNavigator({
    HomeTab: {
        screen: HomeNav,
        // navigationOptions: TabBarConfig.getTabOptions("首页", CHImageSource.TabIcon.icon_homeDe, CHImageSource.TabIcon.icon_homeSe)
    },
    MyTab: {
        screen: MyNav,
        //navigationOptions: TabBarConfig.getTabOptions("我的", CHImageSource.TabIcon.icon_myDe, CHImageSource.TabIcon.icon_mySe)
    }
}, {
    tabBarOptions: {
        activeTintColor: '#3A55EE',
    },
})

//导出可用路由
export let AppRegist = createStackNavigator({
    AppTab: {
        screen: AppTab,
        navigationOptions: () => {
            return {
                header: null
            }
        }
    },

}, {
    initialRouteName: "AppTab",
})