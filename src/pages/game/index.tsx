import Plate from "@/components/Plate"
import {Image, View} from "remax/wechat"
import * as React from 'react';
import * as wx from "remax/wechat";

const toSetting = () => {
    wx.navigateTo({
        url:'../settings/index'
    })
}

export default() => {
    return(
        <View className="game-page">
            {/* <View className="time-counter">
                <TimeCounter/>
            </View> */}
            <View className="upper-panel">
                <Plate theme = 'red'></Plate>
            </View>
            <View className="lower-panel">
                <Plate theme = 'blue'></Plate>
            </View>
            <Image className='oppenent'
                   src='https://i.postimg.cc/VvZN7NTx/oppenent.jpg'/>
            <Image className='me'
                   src='https://i.postimg.cc/V6YLmMcy/me.jpg'/>
            <Image className='biao1'
                   src='https://i.postimg.cc/bJT0wQD1/biao1.jpg'/>
            <Image className='biao2'
                   src='https://i.postimg.cc/6qbddth3/biao2.jpg'/>
            <Image className='game-setting'
                   src='https://i.postimg.cc/GppfCmth/shezhi.jpg'
                   onClick = {toSetting}/>

        </View>
    )
}