/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Echart } from "react-native-csshotel-component"

export class EchartView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            option1: {
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: [
                            { value: 235, name: '视频广告' },
                            { value: 274, name: '联盟广告' },
                            { value: 310, name: '邮件营销' },
                            { value: 335, name: '直接访问' },
                            { value: 400, name: '搜索引擎' }
                        ]
                    }
                ]
            },
            option2: {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        }
    }
    componentDidMount() {

    }
    //效果
    render() {
        return (
            <Echart
                style={{ flex: 1 }}
                option={this.state.option1}
            />
        )
    }
}
