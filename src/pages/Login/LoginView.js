/*************************************************************************************************
 * <pre>
 * @项目名称:   Test
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         329106954@qq.com
 * @创建时间:     2019-04-18 18:49
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';
import { WXButtonText, WXSwitchButton,toDips,toDipsWidth,toDipsHeight } from "react-native-wx-component";
import NavigationService from "../../navigation/NavigationService";
import { inject } from "mobx-react/index";
import { LoginModel } from "./model/LoginModel";
import { Native } from "../../native";
import { ImageSources } from '../../res/ImageSources';
import { FetchUntil } from '../../utils';
import {NavTheme} from "../../navigation";

@inject('userInfo')
export class LoginView extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.loginModel = new LoginModel()
        this.state = {
            username: null,
            disabled: true
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={LoginViewStyles.container}>
                <LoginInputComponent
                    text="11"
                    textInpuValue={this.state.username}
                    onChangeValue={(value) => {
                        if (value.length > 0) {
                            this.setState({
                                username: value,
                                disabled: false
                            })
                        } else {
                            this.setState({
                                username: value,
                                disabled: true
                            })
                        }

                    }}
                    placeholder="账号"
                />

                <WXButtonText
                    text={"去抖"}
                    width={100}
                    height={45}
                    addNormalStyle={{ backgroundColor: "red" }}
                    onPress={() => {
                        // console.log("打印去抖")
                        Native.navigate("loginDemo", "loginDemo")
                    }}
                />

                <WXButtonText
                    text={"登录"}
                    disabled={this.state.disabled}
                    width={100}
                    height={45}
                    addNormalStyle={{ backgroundColor: "red" }}
                    onPress={() => {
                        this.login()
                    }}
                />


                <WXButtonText
                    text={"下一页"}
                    width={100}
                    height={45}
                    addNormalStyle={{ backgroundColor: "red" }}
                    onPress={() => {
                        NavigationService.navigate("HomeView")
                    }}
                />

                <WXSwitchButton
                    width={toDipsWidth(100)}
                    height={toDipsHeight(50)}
                    // backgroundColor={"red"}
                    openClick={() => {
                        console.log("开了")
                    }}
                    closeClick={() => {
                        console.log("关了")
                    }}
                />

                {/*<CssAddButton/>*/}

                <Image
                    source={ImageSources.common.test_img}
                />

                <WXButtonText
                    text={"点击下载bundle模块"}
                    // disabled={this.state.disabled}
                    width={100}
                    height={45}
                    addNormalStyle={{ backgroundColor: "red" }}
                    onPress={() => {
                        this.download()
                    }}
                />

                <WXButtonText
                    text={"变黄"}
                    width={100}
                    height={45}
                    addNormalStyle={{ backgroundColor: "red" }}
                    onPress={() => {
                        NavTheme.setTheme(NavTheme.Themes.yellow)
                    }}
                />

                <WXButtonText
                    text={"变红"}
                    width={100}
                    height={45}
                    addNormalStyle={{ backgroundColor: "red" }}
                    onPress={() => {
                        // console.log("打印去抖")
                        NavTheme.setTheme(NavTheme.Themes.red)
                    }}
                />
            </View>
        );
    }

    download() {
        let url = 'http://127.0.0.1:3000/loginDemo.jsbundle'
        FetchUntil.downLoadBundle(url)
    }


    login() {
        this.loginModel.login().then((result) => {
            this.props.userInfo.setUserName(result.data.userName)
            this.props.userInfo.setAuthValue(result.data.auth)
            NavigationService.navigate("HomeView")
        }).catch(() => {

        })
    }

}

//登录组件
class LoginInputComponent extends Component {
    constructor(props) {
        super(props)
        if (!props.text) {
            throw new Error("text属性未设置")
        } else if (!props.onChangeValue) {
            throw new Error("onChangeValue方法未设置")
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={LoginViewStyles.viewStyle}>
                <Text style={LoginViewStyles.textStyle}>{this.props.text}</Text>

                <TextInput
                    style={LoginViewStyles.textInputStyle}
                    placeholder={this.props.placeholder}
                    onChangeText={(value) => {
                        this.props.onChangeValue(value)
                    }}
                    value={this.props.textInpuValue}
                />
            </View>
        );
    }
}

let LoginViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchStyle: {
        justifyContent: "center",
        alignItems: "center"
    },
    viewStyle: {
        flexDirection: "row",
        height: toDipsHeight(40),
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        color: "#333333",
        fontSize: 14
    },
    textInputStyle: {
        marginLeft: 40,
        borderWidth: 1,
        borderColor: "#999999"
    }
});