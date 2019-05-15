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
 * @创建时间:     2019-04-29 18:23
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/

import React from "react";
import fetch from "./FetchBase";
import {Toast} from "../../component";
import {Native} from "../../native";

class Fetch {
    //网络超时时间(毫秒)
    TIME_OUT_VALUE = 20000
    //业务成功标示符
    SUCCESS_CODE = 1

    /**
     * 请求头
     * @type {{Accept: string, "Content-Type": string}}
     */
    head = {
        Accept: 'application/json',
        "Content-Type": 'application/json',
    };

    /**
     * form格式请求头
     * @type {{Accept: string, "Content-Type": string}}
     */
    headForm = {
        Accept: 'application/json',
        "Content-Type": 'application/x-www-form-urlencoded',
    };


//    get请求
    get(url, params) {
        return this.getFunction(url, params, this.head)
    }


//    post请求
    post(url, params) {
        return this.postFunction(url, params, this.head)
    }

//    postFrom请求
    postForm(url, params) {
        return this.postFormFunction(url,params,this.headForm)
    }


    //get请求实现
    getFunction(url, params, headers) {

        let paramsArray = [];

        //拼接参数
        if (params) {
            Object.keys(params).forEach((key) => {
                return paramsArray.push(key + '=' + params[key])
            });
            if (url.search(/\?/) === -1) {
                //     if(!url.contains('\?')){
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        //进行网络请求,科里化操作
        return new Promise((resolve, reject) => {
            Native.showLoading()
            fetch(url, {
                method: 'GET',
                headers: headers,
                timeout: this.TIME_OUT_VALUE
            })
                .then((response) => {
                    //监测当前的网络请求状态码
                    return this.checkHttpStatus(response)
                })
                .then((response) => {
                    //    对返回结果进行json解析
                    return response.json()
                })
                .then((responseJson) => {
                    //    进行业务状态码解析
                    return this.checkStatus(responseJson, this.SUCCESS_CODE)

                })
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    Toast.showToast(error.message)
                    reject(error.response)
                })
                .finally(() => {
                    Native.dismissLoading()
                })
        })
    }


    //get请求实现
    postFunction(url, params, headers) {

        //进行网络请求,科里化操作
        return new Promise((resolve, reject) => {
            Native.showLoading()
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(params),
                timeout: this.TIME_OUT_VALUE
            })
                .then((response) => {
                    //监测当前的网络请求状态码
                    return this.checkHttpStatus(response)
                })
                .then((response) => {
                    //    对返回结果进行json解析
                    return response.json()
                })
                .then((responseJson) => {
                    //    进行业务状态码解析
                    return this.checkStatus(responseJson, this.SUCCESS_CODE)

                })
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    Toast.showToast(error.message)
                    reject(error.response)
                })
                .finally(() => {
                    Native.dismissLoading()
                })
        })
    }


    //postFrom实现
    postFormFunction(url, params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach((key) => {
            return paramsArray.push(key + '=' + params[key])
        });
        let param = paramsArray.join('&')


        //进行网络请求,科里化操作
        return new Promise((resolve, reject) => {
            Native.showLoading()
            fetch(url, {
                method: 'POST',
                headers: this.headForm,
                body: param,
                timeout: this.TIME_OUT_VALUE
            })
                .then((response) => {
                    //监测当前的网络请求状态码
                    return this.checkHttpStatus(response)
                })
                .then((response) => {
                    //    对返回结果进行json解析
                    return response.json()
                })
                .then((responseJson) => {
                    //    进行业务状态码解析
                    return this.checkStatus(responseJson, this.SUCCESS_CODE)

                })
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    Toast.showToast(error.message)
                    reject(error.response)
                })
                .finally(() => {
                    Native.dismissLoading()
                })
        })
    }


    //-----------------------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    //--------------------------------------------------------工具类----------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    /**
     * 检查网络请求返回状态
     * @param response
     * @returns {*}
     */
    checkHttpStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

    /**
     * 业务成功失败监测
     * @param response  返回结果
     * @param successCode   成功的code
     */
    checkStatus(response, successCode) {
        if (response.status == successCode) {
            return response
        } else {
            let error = new Error();
            error.response = response;
            error.message = response.message;
            throw error;
        }
    }
}

export let FetchUntil = new Fetch()