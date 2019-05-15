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
 * @创建时间:     2019-04-18 18:42
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
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';


export class TextButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        text: null,
        onPress: null,
        style: {}
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={TextButtonStyles.container}>
                <TouchableOpacity
                    style={this.props.style ? this.props.style : {}}
                    onPress={() => {
                        this.props.onPress()
                    }}
                >
                    <Text>{this.props.text ? this.props.text : ""}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


let TextButtonStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
});