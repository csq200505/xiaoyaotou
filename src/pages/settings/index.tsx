import React, { useState } from 'react'
import { View, Image, Button, Text } from 'remax/wechat';
import * as wx from 'remax/wechat';
import store from "@/redux/store";
import {initialGameAct} from "@/redux/gameReducer/actions";

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

const restartGame = () => {
    store.dispatch(initialGameAct())
    wx.redirectTo({
        url:'../game/index'
    })
}

const toGame = () => {
    wx.navigateBack();
}

export default() => {
    const [ muted, setMuted] = useState<boolean>(false);
    const setMute = () => {
        const bgManager = wx.getBackgroundAudioManager();
        if(muted==true){
            bgManager.stop();
            setMuted(false)
        }else{
            bgManager.play();
            setMuted(true)
        }
    }

    return(
        <View className = 'setting-page'>
            <Image className='setting-headline'
                   src ='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/text-setting.png'
            ></Image>

            <Button className='setting-button1'
                    onClick={toGame}><Image
                        className='button-icon'
                        src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-user.png'
                    />返回游戏</Button>
            <Button className='setting-button2'
                    onClick={restartGame}><Image
                className='button-icon'
                src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-user.png'
            />重新开始</Button>
            <Button className='setting-button3'
                    onClick={toHome}><Image
                        className='button-icon'
                        src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-home.png'
                    />返回首页</Button>
            <Image className='setting-icon' 
            src ={muted==false?'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-sound.png'
            :'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-mute.png'}
            onClick={setMute}
            ></Image>
            <Image className='bottom-bg'
             src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/image2.jpeg'/>
        </View>
    )
}
