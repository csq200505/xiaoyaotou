import index from '@/pages/index';
import React, { useEffect, useState } from 'react'
import { View } from 'remax/wechat'
import * as wx from 'remax/wechat'
import { Block , BlockValue } from '../Block';
import '../Plate/index.css';

const baseArray = new Array(9).fill(null)

/** 
 * 棋盘组件
 * 
 */
export default(props:any) => {

  //监测棋盘数值变化
  useEffect(() => {
    //const currentStep = props.currentStep
  },[props])

  let theme = props.theme
  //默认蓝色主题
  if(theme==null){
    theme = 'blue'
  }

  //先利用二维数组构造棋盘
  const bArray =new Array(9).fill(null).map((item,index) => (
    {
      position:index,
      theme:theme
    })
  )

  //九宫格状态集
  const [ state, setState ] = useState<BlockValue[]>(bArray);
  
  function getState(index:number){
      return state[index]
  }

  //模块按键触发事件
  function onClick(index:number, isEmpty:boolean){
    if(!isEmpty){
      wx.showToast({
        title:'这里已经有棋子啦！',
        icon:'error',
        duration:2000
      })
      return;
    }
    //解构
    const tempState = [...state]
    setState(tempState.map((item,pos) => {
      if(pos!=index){
        return item;
      }else{
        return{
          ...item,
          value:5
        }
      }
    }))
  }

  return (
      <View className='theme'>
        {
          baseArray.map((item, index) => {
            if(index<6){
              switch(index){
                case 0:
                case 2:
                case 3:
                case 5:
                  return(
                    <View className={'block-item-'+theme+'-normal'} key = {index} id = {'block'+index}>
                      <Block value={getState(index)} onClick = {onClick}/>
                    </View>
                  )
                case 1:
                case 4:
                  return(
                    <View className={'block-item-'+theme+'-middle'} key = {index} id = {'block'+index}>
                      <Block value={getState(index)} onClick = {onClick}/>
                    </View>
                  )    
                default:break;    
              }              
            }else{
              if(index === 7){
                return (
                  <View className={'block-item-'+theme+'-bottom'} key = {index} id = {'block'+index}>
                    <Block value={getState(index)} onClick = {onClick}/>
                  </View>
                )
              }else{
                return (
                  <View className= 'block-item-corner' key = {index} id = {'block'+index}>
                    <Block value={getState(index)} onClick = {onClick}/>
                  </View>
                )
              }
            }
          })
        }
      </View>
  )
}
