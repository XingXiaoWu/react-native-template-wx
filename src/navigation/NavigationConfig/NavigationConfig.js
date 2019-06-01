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
 * @创建时间:     2019-05-23 10:59
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React from "react";
import {View, Text, TouchableOpacity} from "react-native"
import {toDips, toDipsHeight, toDipsWidth} from "../../utils/PixelRatioUtils";
import {Image} from "react-native"
import {action, computed, observable} from "mobx"

//header头颜色定制
class _NavTheme {

    Themes={
        red:"red",
        yellow:"yellow",
        blue:"blue"
    }

    @observable
    _theme = ""

    @action
    setTheme(theme) {
        this._theme = theme
    }

    @computed
    get theme() {
        return this._theme
    }
}
export let NavTheme = new _NavTheme()

class _NavigationConfig {
    constructor() {
        // 主题色
        this.theme = {
            red: "red"

        }
    }

    navConfig(theme) {
        let options = {
            // // 一个应用于 header 的最外层 View 的 样式对象， 如果你设置 backgroundColor ，他就是header 的颜色。
            headerStyle: {
                backgroundColor: theme.theme
            },
            // headerTitle: {},
            // // 如果我们想为标题定制fontFamily，fontWeight和其他Text样式属性，我们可以用它来完成。
            // headerTitleStyle:{},
            // headerLeft:{},
            // headerRight:{},
            // //这里可以放组件,比如放渐变
            // headerBackground: (),
            // // 返回按钮和标题都使用这个属性作为它们的颜色。 在下面的例子中，我们将 tint color 设置为白色（#fff），所以返回按钮和标题栏标题将变为白色。
            // headerTintColor: "",
            // headerBackTitle: "",
        }

        return options;
    }


    /**
     * 生成Tab相关
     * @param tabBarTitle
     * @param normalImage
     * @param selectedImage
     * @param navTitle
     * @param navigation
     * @returns {{tabBarLabel: *, tabBarIcon: (function({focused?: *}): *), headerTitle: *, headerTitleStyle:
     *     {fontSize: *, color: string, alignSelf: string}, headerStyle: {backgroundColor: string}, tabBarVisible:
     *     boolean}}
     */
    tabConfig(tabBarTitle, normalImage, selectedImage, navigation) {
        const tabBarLabel = tabBarTitle;
        const tabBarIcon = ({focused}) => {
            return (
                <Image
                    source={!focused ? normalImage : selectedImage}
                    resizeMode={"contain"}
                    style={{height: toDipsHeight(20), width: toDipsWidth(20)}}
                />
            )
        };
        // const headerTitle = navTitle;
        const headerTitleStyle = {
            fontSize: toDips(36),
            color: 'white',
            alignSelf: 'center',
        };
        // header的style
        const headerStyle = {backgroundColor: '#4ECBFC'};
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
            tabBarVisible = false;
        }

        return {
            tabBarLabel: tabBarLabel,
            tabBarIcon: tabBarIcon,
            // headerTitle: headerTitle,
            headerTitleStyle: headerTitleStyle,
            headerStyle: headerStyle,
            tabBarVisible: tabBarVisible,
        };
    }

}

export let NavigationConfig = new _NavigationConfig()