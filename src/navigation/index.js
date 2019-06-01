/*************************************************************************************************
 * <pre>
 * @项目名称:   react-native-template-wx
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:    路由导出
 * @版本:
 * @作者:         wuxing
 * @邮箱:         329106954@qq.com
 * @创建时间:     2019-05-23 13:28
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import {AppRegist} from "./Regist/RegisterApp";
import {AppLoginNav} from "./Regist/RegisterLogin";
import {NavigationConfig,NavTheme} from "./NavigationConfig/NavigationConfig";
import navigate from "./NavigationService"
import NavigationService from "./NavigationService"
export {
    NavigationConfig,
    AppRegist,
    AppLoginNav,
    navigate,
    NavigationService,
    NavTheme
}