import * as React from 'react';
import { View, Text, Image, Button } from 'remax/wechat';
import styles from './index.css';
import * as wx from "remax/wechat";

/**
 *
 * @author csq
 */

const toGame = () => {
    wx.navigateTo({
        url:'../game/index'
    })
}
const toBack = () => {
    wx.navigateBack();
}

export default () => {


    return(
        <View className='pattern-page'>
            <Text className='pattern-back'
                  onClick = {toBack}>{'< 返回'}</Text>
            <Image className='pattern-upDice'
                   src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/cutgraph3.jpeg'/>
            <Image className='pattern-downDice'
                   src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/cutgraph4.jpeg'/>
            <Image className='pattern-text'
                    src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/patternchoose.jpeg'/>

            <Button className='pattern-bottonOne'
                    onClick = {toGame}
            ><Image
                className='button-icon'
                src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-user.png'
            />本地对战</Button>

            <Button className='pattern-bottonTwo'
                    onClick = {toGame}
            ><Image
                className='button-icon'
                src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-one.png'
            />人机对战</Button>
            <Button className='pattern-bottonThree'
                    onClick = {() => wx.showToast({
                        title:'敬请期待！',
                        icon:'none',
                        duration:2000
                    })}
            ><Image
                className='button-icon'
                src = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/icon-multiple.png'
            />在线对战</Button>

        </View>
    )
}