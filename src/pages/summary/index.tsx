import store from "@/redux/store";
import {initialGameAct} from "@/redux/gameReducer/actions";
import * as wx from "remax/wechat";
import React, {useState} from "react";
import {Button, Image, View} from "remax/wechat";

/**
 *
 * @author csq
 */

const toHome = () => {
    store.dispatch(initialGameAct())
    wx.redirectTo({
        url:'../index/index'
    })
}

const toGame = () => {
    wx.navigateBack();
}

export default() => {
    return(
        <View className = 'summary-page'>
            <Button className='summary-button1'
                    onClick={toGame}><Image
                className='button-icon'
                src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-user.png'
            />查看结果</Button>
            <Button className='summary-button2'
                    onClick={toHome}><Image
                className='button-icon'
                src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-home.png'
            />返回首页</Button>
        </View>
    )
}