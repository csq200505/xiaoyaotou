import * as React from 'react';
import { Swiper, SwiperItem, View, Image, Text } from "remax/wechat";
import * as wx from "remax/wechat";

/**
 *
 * @author csq
 */

const toBack = () => {
    wx.navigateBack();
}

export default () => {
    return (
        <View className="rule-page">
            <Text className='rule-back'
                  onClick = {toBack}>{'< 返回'}</Text>
            <Image className='rule-headline'
                   src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/text-rule.png"/>
            <Swiper className="rule-swiper">
                <SwiperItem>
                    <Image className="swiper-image" 
                    src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/rule1.jpeg"></Image>
                </SwiperItem>
                <SwiperItem>
                    <Image className="swiper-image" 
                    src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/rule2.jpeg"></Image>
                </SwiperItem>
                <SwiperItem>
                    <Image className="swiper-image" 
                    src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/rule3.jpeg"></Image>
                </SwiperItem>
                <SwiperItem>
                    <Image className="swiper-image" 
                    src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/rule4.jpeg"></Image>
                </SwiperItem>
            </Swiper>
            <Image className='bottom-bg'
             src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/image2.jpeg"/>
        </View>
    );
};