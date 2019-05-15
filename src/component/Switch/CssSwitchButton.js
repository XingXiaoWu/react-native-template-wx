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
 * @创建时间:     2019-05-06 10:44
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity, ViewPropTypes
} from "react-native";
import PropTypes from 'prop-types';
import {toDips, toDipsHeight, toDipsWidth} from "../../utils/PixelRatioUtils";


const SwitchButtonStyles = StyleSheet.create({

    offStyle: {
        borderColor: "transparent",
        backgroundColor: "#d5d5d5",
        flexDirection: 'row',
        alignItems: "center",
    },
    onStyle: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        borderColor: "transparent",
        alignItems: "center",
    },
    touchIcon: {
        marginLeft: toDipsWidth(2),
        marginRight: toDipsWidth(2),
        borderColor: "transparent",
        backgroundColor: "white",
    },
});


export class CssSwitchButton extends Component {

    static propTypes = {
        condition: PropTypes.bool,  //当前开关状态
        onStyle: ViewPropTypes.style,    //开启状态样式
        offStyle: ViewPropTypes.style,    //关闭状态样式
        backgroundColor: PropTypes.string,    //背景颜色
        height: PropTypes.number,
        width: PropTypes.number,
        openClick: PropTypes.func,
        closeClick: PropTypes.func,
        addNormalStyle: ViewPropTypes.style,      //默认样式不变,新增的按钮样式
    }

    static defaultProps = {
        condition: false,  //当前开关状态
        onStyle: SwitchButtonStyles.onStyle,    //开启状态样式
        offStyle: SwitchButtonStyles.offStyle,    //关闭状态样式
        backgroundColor: "#73ce6f",    //背景颜色
        height: toDipsHeight(31),
        width: toDipsWidth(51),

        addNormalStyle: {},      //默认样式不变,新增的按钮样式
    }

    constructor(props) {
        super(props)
        this.state = {
            condition: props.condition
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    this.getTouchStyle(this.state.condition, this.props.backgroundColor),
                    {
                        width: this.props.width,
                        height: this.props.height,
                        borderRadius: this.props.height / 2,
                    },
                    this.props.addNormalStyle
                ]}
                onPress={() => {
                    this.setState({
                        condition: !this.state.condition
                    }, () => {
                        if (this.state.condition){
                            this.props.openClick && this.props.openClick()
                        } else {
                            this.props.closeClick && this.props.closeClick()
                        }

                    })
                }}>
                <View style={[
                    SwitchButtonStyles.touchIcon,
                    {
                        height: (this.props.height - 4),
                        width: (this.props.height - 4),
                        borderRadius: (this.props.height - 2) / 2,
                    }
                ]}/>
            </TouchableOpacity>
        );
    }

    //获取当前布局
    getTouchStyle(condition, backgroundColor) {
        return condition ? [this.props.onStyle, {backgroundColor: backgroundColor}] : this.props.offStyle
    }
}

