/*************************************************************************************************
 * <pre>
 * @项目名称:   2.0.0
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:    路由注册
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
 * @创建时间:     2019-04-04 14:18
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component} from 'react';
import {createSwitchNavigator,createAppContainer} from "react-navigation";
import {AppLoginNav} from "./navigation/Regist/RegisterLogin";
import {AppRegist} from "./navigation/Regist/RegisterApp";
import NavigationService from "./navigation/NavigationService"
import index from './store'
import {Provider} from "mobx-react/index";

const AppTopNav = createAppContainer(createSwitchNavigator({
    AppLogin: AppLoginNav,
    AppRegister: AppRegist,
}, {
    initialRouteName: "AppLogin",
}))

export class App extends Component {
    render() {
        return (
            <Provider {...index}>

                <AppTopNav
                // 抽成组件还有个好处,可以接受原生的传值,不至于被navigation的options覆盖
                    screenProps={ this.props }
                    ref={(navigatorRef) => {
                        //TODO:如果需要,可以在这里注册顶层路由用于非页面的跳转
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}