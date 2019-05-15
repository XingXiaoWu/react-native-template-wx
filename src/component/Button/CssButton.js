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
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import {toDips, toDipsHeight, toDipsWidth} from "../../utils/PixelRatioUtils";

let CssButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultNormalStyle: {

        borderRadius: toDips(5),
        backgroundColor: "#108EE9",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultDisableStyle: {
        borderRadius: toDips(5),
        backgroundColor: "#DDDDDD",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultNormalTextStyle: {
        fontSize: toDips(18),
        color: "#FFFFFF",
    },
    defaultDisableTextStyle: {
        fontSize: toDips(18),
        color: "#BBBBBB",
    }
});

export class CssButton extends Component {

    static propTypes = {
        normalStyle: ViewPropTypes.style,    //按钮默认样式
        disableStyle: ViewPropTypes.style,   //按钮补课点击样式
        text: PropTypes.string.isRequired,  //按钮的字
        normalTextStyle: Text.propTypes.style,     //字体样式
        disableTextStyle: Text.propTypes.style,     //字体样式
        onPress: PropTypes.func,            //点击事件
        disabled: PropTypes.bool,           //是否可点击,true不可点,false可点
        width: PropTypes.number,
        height: PropTypes.number,
        addNormalStyle: ViewPropTypes.style,      //默认样式不变,新增的按钮样式
    }

    static defaultProps = {
        normalStyle: CssButtonStyles.defaultNormalStyle,    //按钮默认样式
        disableStyle: CssButtonStyles.defaultDisableStyle,   //按钮补课点击样式
        text: "",  //按钮的字
        normalTextStyle: CssButtonStyles.defaultNormalTextStyle,     //字体样式
        disableTextStyle: CssButtonStyles.defaultDisableTextStyle,     //字体样式
        disabled: false,           //是否可点击
        width: toDipsWidth(345),
        height: toDipsHeight(45),
        addNormalStyle: {},      //默认样式不变,新增的按钮样式
    }

    constructor(props) {
        super(props)
        //    新建一个定时器用于去抖节流使用
        this.debounceTimer = null
    }

    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    this.getTouchStyle(this.props.disabled),
                    {
                        width: this.props.width,
                        height: this.props.height
                    },]}
                disabled={this.props.disabled}
                onPress={() => {
                    this.debounce(this.props.onPress)
                }}
            >
                <Text style={[this.getTextStyle(this.props.disabled)]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }

    getTouchStyle(disable) {
        return disable ? this.props.disableStyle : [this.props.normalStyle, this.props.addNormalStyle]
    }

    getTextStyle(disable) {
        return disable ? this.props.disableTextStyle : this.props.normalTextStyle
    }

// 去抖和节流是不同的，因为节流虽然中间的处理函数被限制了，但是只是减少了频率，而去抖则把中间的处理函数全部过滤掉了，只执行规判定时间内的最后一个事件。


//    添加去抖:在一段时间内只会触发一次
    debounce(callBack) {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
            callBack()
        }, 200)
    }


//    添加节流

}
