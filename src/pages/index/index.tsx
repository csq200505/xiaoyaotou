import * as React from 'react';
import { View, Text, Image, Button } from 'remax/wechat';
import styles from './index.css';
import * as wx from 'remax/wechat'
import { usePageEvent } from '@remax/framework-shared';

const toPattern = () => {
  wx.navigateTo({
    url:'../gamePattern/index'
  })
}

const toRules = () => {
  wx.navigateTo({
    url:'../rules/index'
  })
}

export default () => {
  usePageEvent('onLoad',() => {
    const bgManager = wx.getBackgroundAudioManager()
    bgManager.src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/bgm.mp3";
  })

  return (
    <View className={styles.first}>
      <Image className={styles.upDice}
       src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/cutgraph3.jpeg'/>
      <Image className={styles.downDice} 
      src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/cutgraph4.jpeg'/>
      <Button className={styles.bottonOne}
        onClick = {toPattern}
        >开始游戏</Button>
      <Button className={styles.bottonTwo}
        onClick = {toRules}
      >游戏规则</Button>
    </View>
  );
};
