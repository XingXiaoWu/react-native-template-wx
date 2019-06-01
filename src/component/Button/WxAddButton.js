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
 * @创建时间:     2019-05-07 10:37
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import {toDips, toDipsHeight, toDipsWidth} from "../../utils/PixelRatioUtils";


let WxAddButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchStyle: {
        width: toDipsWidth(40),
        backgroundColor: "blue",
        // justifyContent:"center",
        alignItems: "center",
        justifyContent: "center",
        padding: toDips(10)

    },
    textStyle: {
        fontSize: toDips(24),
        // color: "#fff"
    }
});

export class WxAddButton extends PureComponent {

    static propTypes = {
        onPress: PropTypes.func,
        touchStyle: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
    }

    static defaultProps = {
        touchStyle: WxAddButtonStyles.touchStyle,
        textStyle: WxAddButtonStyles.textStyle
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity
                style={[this.props.touchStyle]}
            >
                <Text
                    style={[this.props.textStyle]}
                > 1 </Text>
            </TouchableOpacity>
        )
    }
}
