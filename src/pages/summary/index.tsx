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
    wx.redirectTo({
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
                   src='https://i.postimg.cc/8zTxR5N3/gameover.jpg'/>

            <Image className='oppenent'
                   src='https://i.postimg.cc/VvZN7NTx/oppenent.jpg'/>
            <Image className='score1'
            src='https://i.postimg.cc/kGrpBMTT/final.jpg'/>
            <Text className='s1'>{scores.blue}</Text>
            {
                scores.blue>=scores.red?
                    <Image className='win1'
                           src='https://i.postimg.cc/MptNdSGG/win.jpg'/>:null
            }

            <Image className='me'
                   src='https://i.postimg.cc/V6YLmMcy/me.jpg'/>
            <Image className='score2'
                   src='https://i.postimg.cc/wxJrnJBZ/score.jpg'/>
            <Text className='s2'>{scores.red}</Text>
            {
                scores.blue<=scores.red?
                    <Image className='win2'
                           src='https://i.postimg.cc/MptNdSGG/win.jpg'/>:null
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