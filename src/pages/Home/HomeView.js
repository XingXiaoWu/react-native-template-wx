/*************************************************************************************************
 * <pre>
 * @项目名称:   Test
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
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
    Text, TouchableOpacity,
    View, ViewPropTypes,
} from 'react-native';
import {TextButton} from "../../component/TextButton";
import NavigationService from "../../navigation/NavigationService";
import {inject, observer} from "mobx-react/index";
import {Toast} from "../../component";
import PropTypes from "prop-types";
import {Permission} from "../../congfigs";

@inject('userInfo')
@observer
export class HomeView extends Component {


    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        let {userInfo} = this.props;
        console.log("render了")
        return (
            <View style={HomeViewStyles.container}>
                <Text>HomeView</Text>
                <TextButton
                    style={{
                        backgroundColor: "gray",
                    }}
                    text={"点我跳转回登录"}
                    onPress={() => {
                        NavigationService.navigate("LoginView")
                    }}
                />
                <TextButton
                    style={{
                        backgroundColor: "gray",
                    }}
                    text={"点我更改数据"}
                    onPress={() => {
                        userInfo.setUserName("123")
                        userInfo.setAuthValue([0,1,2,3,4])
                    }}
                />
                <Text>用户名:{userInfo.userName}</Text>
                <View>
                    <ModelComponent
                        modelTitle={"查看房间"}
                        modelTip={"查看房间"}
                        permission={Permission.readRoom}
                        onPress={() => {
                            Toast.showToast("有权限")
                        }}
                    />

                    <ModelComponent
                        modelTitle={"设置房间"}
                        modelTip={"设置房间"}
                        permission={Permission.setRoom}
                        onPress={() => {
                            Toast.showToast("有权限")
                        }}
                    />

                    <ModelComponent
                        modelTitle={"支付账单"}
                        modelTip={"支付账单"}
                        permission={Permission.payOrder}
                        onPress={() => {
                            Toast.showToast("有权限")
                        }}
                    />

                    <ModelComponent
                        modelTitle={"账号管理"}
                        modelTip={"账号管理"}
                        permission={Permission.manageAccount}
                        onPress={() => {
                            Toast.showToast("有权限")
                        }}
                    />

                    <ModelComponent
                        modelTitle={"房间管理"}
                        modelTip={"房间管理"}
                        permission={Permission.manageRoom}
                        onPress={() => {
                            Toast.showToast("有权限")
                        }}
                    />
                </View>
            </View>
        );
    }
}


/**
 * 每个功能模块的组件
 */
@inject('userInfo')
class ModelComponent extends Component {


    static propTypes = {
        modelTitle: PropTypes.string.isRequired,    //大标题
        modelTip: PropTypes.string.isRequired,       //详情
        clickTip: PropTypes.string,                 //没有权限的提示语

        permission: PropTypes.number,                  //权限
        onPress: PropTypes.func,                    //点击事件
        style: ViewPropTypes.style,                 //样式
    }

    static defaultProps = {
        modelTitle: "",
        modelTip: "",

        clickTip: "您没有权限",
        permission: 0,
        onPress: null,
        style: {}
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.hasPermission(this.props.permission)) {
                        this.props.onPress()
                    } else {
                        Toast.showToast(this.props.clickTip)
                    }
                }}
                style={
                    this.hasPermission(this.props.permission) ?
                        HomeViewStyles.modelView :
                        HomeViewStyles.noModelView}
            >
                <Text
                    style={HomeViewStyles.textModelTitleEnable}
                >
                    {this.props.modelTitle}
                </Text>

                <Text style={HomeViewStyles.textModelTip}>{this.props.modelTip}</Text>

            </TouchableOpacity>
        )
    }

    /**
     * 用户是否具有该模块的权限
     * @param permission
     * @returns {number}
     */
    hasPermission(permission) {
        let has = permission & this.props.userInfo.authValue
        return has
    }
}

let HomeViewStyles = StyleSheet.create({
    container: {
        // flex: 1,
    },

    //有权限
    modelView: {
        height: 90,
        width: 200,
        backgroundColor: "#ad8c51",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    //没权限
    noModelView: {
        height: 90,
        width: 200,
        backgroundColor: "#0065c4",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    textModelTitleEnable: {
        color: "#bbbbbb",
        fontSize: 18
    },
    textModelTitleDisable: {
        color: "#bbbbbb",
        fontSize: 18
    },
    textModelTip: {
        fontSize: 12,
        marginTop: 10,
        color: "#bbbbbb"
    },
});