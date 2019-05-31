
/*************************************************************************************************
 * <pre>
 * @项目名称:   Echart
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
 * @创建时间:     2019-05-30 18:42
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/

import React, {Component} from 'react';
import {
    View,
    // WebView,
    Platform, ViewPropTypes, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {WebView} from "react-native-webview";


let htmlAndroid = {uri: 'file:///android_asset/draw/stamp_new.html'};
let htmlIOS = require('./index.html');

export class Echart extends Component {

    static propTypes = {
        option: PropTypes.object,
        exScript: PropTypes.string,
        onMessage: PropTypes.func,
    };

    static defaultProps = {
        option: {},
        exScript: "",
        onMessage: () => {
        },
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //    处理变化
        let optionJson = JSON.stringify(this.props.option, (key, value) => {
            //如果是方法,转成string
            if (typeof value === "function") {
                return value.toString();
            }
            return value;
        });
        if (optionJson !== JSON.stringify(prevProps.option)) {
            this.update(optionJson);
        }
    }

    update(optionJson) {
        this.webView.postMessage(optionJson);
    }


    render() {
        return (
            <View style={this.props.style}>
                <WebView
                    ref={(webview) => {
                        this.webView = webview;
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                    scrollEnabled={false}
                    //ios不用自适配
                    scalesPageToFit={Platform.OS !== 'ios'}
                    source={Platform.OS === 'ios' ? htmlIOS : htmlAndroid}
                    originWhitelist={['*']}
                    injectedJavaScript={this.renderChart(this.props)}
                />
            </View>
        );
    }

    renderChart(props) {
        return `
        const chart = echarts.init(document.getElementById('main'), null, {renderer: 'svg'});
        chart.setOption(${JSON.stringify(props.option)});
        document.addEventListener('message', (e) => {
            chart.setOption(JSON.parse(e.data, function (key, val) {
                if (val.indexOf && val.indexOf('function') > -1) {
                    return eval('(' + val + ')')
                }
                return val
            }), true);
        });
        ${props.exScript}
        `
    }

}