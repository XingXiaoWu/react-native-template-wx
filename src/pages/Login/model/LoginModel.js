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
 * @创建时间:     2019-04-30 12:08
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import {action, computed, observable} from "mobx"
import {FetchUntil} from "../../../utils";
import {UrlModel} from "../../../server/UrlModel";

export class LoginModel {

    login(param) {
        let url = UrlModel.getLoginUrl()
        let promise = new Promise((resolve, reject) => {
            FetchUntil.post(url, param)
                .then((result) => {
                    console.log("result:" + JSON.stringify(result))
                    resolve(result)
                })
                .catch((error) => {
                    console.log("error:" + JSON.stringify(error))
                    reject(error)
                })
        })

        return promise
    }

}
