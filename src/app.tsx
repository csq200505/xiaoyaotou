import * as React from 'react';
import { useEffect } from 'react';
import * as wx from 'remax/wechat'
import './app.css';
import combineReducer from './redux/combineReducer';
import store from './redux/store';
import {Provider} from "react-redux";

const storage = store

const App: React.FC = props => {
    let bgManager = wx.getBackgroundAudioManager()
    let musicState = false;

    //启动小程序自动播放
    useEffect(() => {
        bgManager.title = '普通disco'
        bgManager.protocol='https'
        bgManager.src = "https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/bgm.mp3";
    },[])

    bgManager.onPlay(() => {
        console.log('开始播放音乐')
    })

    bgManager.onError((error) => {
        console.log(error)
    })

    //自然结束后进行回调
    bgManager.onEnded(() => {
        if(musicState == false){
            bgManager.play()
        }
    })

    //监听开关音乐事件变化
    store.subscribe(() => {
        musicState = store.getState().combineReducer.music.state
        if(store.getState().combineReducer.music.type == 'TO_MUTE'){
            musicState = true
            bgManager.pause()
        }else if(store.getState().combineReducer.music.type == 'TO_UNMUTE'){
            musicState = false
            bgManager.play()
        }
    })

    return <Provider store = {storage}>{props.children}</Provider>
}
export default App;