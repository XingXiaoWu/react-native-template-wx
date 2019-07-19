/*************************************************************************************************
 * <pre>
 * @项目名称:   RevenueReport
 * @版权所有:   wuxing (C) 2019
 *
 *
 * @类描述:    本地存储工具
 * @版本:         V2.0.0
 * @作者:         wuxing
 * @邮箱:         329106954@qq.com
 * @创建时间:     2019-06-06 16:30
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React from 'react';
// import {AsyncStorage} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

export class ValueHelper {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     * @note 没存取出来的是个null类型，不是"" 也不是"null"
     *
     */
    static get(key) {
        return new Promise((resolve, reject) => {
                return AsyncStorage.getItem(key).then((value) => {
                    if (/\:/.test(value) || /\"/.test(value)) {
                        value = JSON.parse(value)
                        resolve(value)
                    }
                    resolve(value)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            }
        );
    }

    /**
     * 批量获取
     * @param keys
     * @returns {Promise<any> | Promise<*>}
     */
    static multiGet(keys) {
        let promise = new Promise((resolve, reject) => {
            AsyncStorage.multiGet(keys).then((values) => {
                //由于RN的问题，返回的value会被双引号包围，因此需要进行替换
                for (let i = 0; i < values.length; i++) {
                    if (values[i][1] != null) {
                        let a = values[i][1].replace(/\"/g, '')
                        values[i][1] = a
                    }
                }
                resolve(values)
            })
        })
        return promise
        /*return AsyncStorage.multiGet(keys).then((values) => {
            //由于RN的问题，返回的value会被双引号包围，因此需要进行替换
            for (let i = 0; i < values.length; i++) {
                if (values[i][1] != null) {
                    let a = values[i][1].replace(/\"/g, '')
                    values[i][1] = a
                }
            }
            return values
        })*/
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        if (value == null || value === undefined) {
            return Promise.reject("value is undefined")
        }
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    /*批量保存*/
    static multiSave(list, callback) {
        return new Promise((resolve, reject) => {
            if (!list || list.length === 0) {
                reject("list cannot be null")
            } else {
                AsyncStorage.multiSet(list).then((values) => {
                    console.log(list, values)
                    resolve(null)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            }
        })
    }

    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return ValueHelper.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 删除数据
     * @param key
     * @returns {*}
     */
    static remove(key) {
        return AsyncStorage.removeItem(key);
    }

    static multiRemove(keys) {
        return AsyncStorage.multiRemove(keys)
    }


    /**
     * 清除所有本地存储的数据并返回一个promise
     * @returns {*}
     */
    static removeAll() {
        return AsyncStorage.clear()
    }
}

/**
 * add by wx 2017-07-21
 */
export class ValueKey {
    // static
}