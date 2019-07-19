/*************************************************************************************************
 * <pre>
 * @项目名称:   react-native-template-wx
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         329106954@qq.com
 * @创建时间:     2019-04-18 18:48
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import NavigationService from "../../navigation/NavigationService";
import {WXTextButton} from "react-native-wx-component";
import {inject, observer} from "mobx-react/index";

@inject('userInfo')
@observer
export class MyView extends Component {

    userInfo = this.props.userInfo;

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={MyViewStyles.container}>
                <Text>MyView</Text>
                <WXTextButton
                    text={"点我跳转回登录"}
                    onPress={()=>{
                        NavigationService.navigate("LoginView")
                    }}
                />
                <Text>用户名:{this.userInfo.userName}</Text>

                <WXTextButton
                    text={"点击用户名改为无星"}
                    onPress={()=>{
                        this.userInfo.setUserName("无星")
                    }}
                />
            </View>
        );
    }
}

let MyViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});