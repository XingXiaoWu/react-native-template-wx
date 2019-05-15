/*************************************************************************************************
 * <pre>
 * @项目名称:   CssTest
 * @版权所有:   csshotel (C) 2019
 *
 *
 * @类描述:    用户信息类
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         xing.wu@Ctrip.com
 * @创建时间:     2019-04-22 13:26
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import {action, computed, configure, observable} from "mobx/lib/mobx"

// 不允许在动作外部修改状态
configure({enforceActions: "observed"})

export class UserInfo {
    @observable
    _userName = null

    @computed
    get userName() {
        return this._userName
    }

    @action
    setUserName(str) {
        console.log("修改userName")
        this._userName = str
    }

    @observable
    _authValue = null

    @computed
    get authValue() {
        return this._authValue
    }

    @action
    setAuthValue(authList) {
        console.log("修改authList")
        //遍历数据
        let authValue = 0
        if (authList && authList.length > 0) {
            for (let i = 0; i < authList.length; i++) {
                let index = authList[i]
                let permission = Math.pow(2, index)
                authValue += permission
            }
        }
        this._authValue = authValue
    }
}