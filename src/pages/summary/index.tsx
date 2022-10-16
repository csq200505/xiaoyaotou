import store from "@/redux/store";
import {initialGameAct} from "@/redux/gameReducer/actions";
import * as wx from "remax/wechat";
import React, {useEffect, useState} from "react";
import {Button, Image, View,Text} from "remax/wechat";
import {countResult} from "@/pages/game/gameStrategy";
import {GameType} from "@/redux/gameReducer";

/**
 *
 * @author csq
 */

const toGame = () => {
    wx.navigateBack();
}

const toHome = () => {
    store.dispatch(initialGameAct(GameType.PVP))
    wx.reLaunch({
        url:'../index/index'
    })
}

const restartGame = () => {
    let gameType = store.getState().combineReducer.game.gameType
    store.dispatch(initialGameAct(gameType))
    wx.redirectTo({
        url:gameType == GameType.PVP?'../game/index':'../AIGame/index'
    })
}

export default() => {
    const [scores, setScores] = useState({blue:0,red:0})
    useEffect(()=>{
        const sum = store.getState().combineReducer.game
        setScores({...countResult(sum.gridBlue,sum.gridRed)})
    },[])
    return(
        <View className = 'summary-page'>
            <Image className='gameover'
                   src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/gameOver.jpeg'/>

            <Image className='oppenent'
                   src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/oppenent.jpeg'/>
            <Image className='score1'
            src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/blueFinal.jpeg'/>
            <Text className='s1'>{scores.blue}</Text>
            {
                scores.blue>=scores.red?
                    <Image className='win1'
                           src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/winner.jpeg'/>:null
            }

            <Image className='me'
                   src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/me.jpeg'/>
            <Image className='score2'
                   src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/redFinal.jpeg'/>
            <Text className='s2'>{scores.red}</Text>
            {
                scores.blue<=scores.red?
                    <Image className='win2'
                           src='https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/winner.jpeg'/>:null
            }

            <Button className='summary-button1'
                    onClick={toGame}>返回棋盘</Button>
            <Button className='summary-button2'
                    onClick={restartGame}>再来一局</Button>
            <Button className='summary-button3'
                    onClick={toHome}>退出游戏</Button>
        </View>
    )
}