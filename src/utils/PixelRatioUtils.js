/*************************************************************************************************
 * <pre>
 * @项目名称:   revenue_pt 2
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:    px转pt的适配
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
 * @创建时间:     14:52
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import {Dimensions, PixelRatio, Platform} from "react-native";
//得到的是pt
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const pix = PixelRatio.get();
//6,6s,宽高如下
const defaultWidth = 375;
const defaultHeight = 667;


//换算 字体，尺寸，行距
function toDips(pt) {
    return Math.round(pt);
}


//fontSize, left, right, width   使用对象
function toDipsWidth(pt) {
    return Math.round(pt * screenWidth / defaultWidth);
}


//top, bottom, height   使用对象
function toDipsHeight(pt) {
    return Math.round(pt * screenHeight / defaultHeight);
}

export {
    toDips,
    toDipsWidth,
    toDipsHeight,
    screenHeight,
    screenWidth,
    pix
};