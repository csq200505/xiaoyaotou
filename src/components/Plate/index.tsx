import index from '@/pages/index';
import React, { useEffect, useState } from 'react'
import { View } from 'remax/wechat'
import * as wx from 'remax/wechat'
import { Block , BlockValue } from '../Block';
import '../Plate/index.css';
import store from '@/redux/store';
import { blueTurnAct, doCurrentStepUpdate, redTurnAct } from '@/redux/gameReducer/actions';
import { GameStep, UpdateType } from '@/redux/gameReducer';

/**
 *
 * @author csq
 */

const baseArray = new Array(9).fill(null)


//方便页面确认棋盘入参数
export interface PlateInput{
  gameStep:GameStep,
  value:any
}

//推断修改目标值
function deduceIndex(index:number):number{
  switch(index){
    case 0:return 6;
    case 1: return 3;
    case 2: return 0;
    case 3: return 7;
    case 4: return 4;
    case 5: return 1;
    case 6: return 8;
    case 7: return 5;
    case 8: return 2;
    default:return 0;
  }
}

/**
 * 棋盘组件
 *
 */
export default(props:any) => {
  let theme = props.theme
  //默认蓝色主题
  if(theme==null){
    theme = 'blue'
  }

  //预先声明作用的轮次
  const turn = theme =='red'?GameStep.BLUE_TURN:GameStep.RED_TURN

  //先利用二维数组构造棋盘
  const bArray =new Array(9).fill(null).map((item,index) => (
      {
        position:index,
        theme:theme,
        value:undefined
      })
  )

  //九宫格状态集
  const [ state, setState ] = useState<BlockValue[]>(bArray);


  //获取当下棋盘组件的值
  function getState(index:number){
    return state[index]
  }

  //键盘是否允许触发
  const [optAble, setOptAble ] = useState<boolean>(true)

  //当前棋盘被允许下入的点数
  const [ value, setValue ] = useState<any>(null)

  let gameState = store.getState().combineReducer.game

  let blueGrid = gameState.gridBlue

  let redGrid = gameState.gridRed

  let type = gameState.type


  //实时监控棋盘可用状态
  useEffect(() => {
    setOptAble(props.optAble)
  },[props.optAble])

  //实时监控棋盘允许下子
  useEffect(() => {
    setValue(props.value)
  },[props.value])


  //每次事件变化及时更新内容
  store.subscribe(()=> {

    gameState = store.getState().combineReducer.game

    blueGrid = gameState.gridBlue

    redGrid = gameState.gridRed

    type = gameState.type

    //第一步，进行游戏初始化
    if(type == GameStep.INTITIAL_GAME){
      setState([])
    }

    //第二步，判断棋盘是否需要更新并执行更新
    if(theme == 'blue'){
      const tempState = state.map((value,index) => {
        return {
          ...value,
          value:redGrid[deduceIndex(index)]
        }
      })
      if(JSON.stringify(tempState.sort()) != JSON.stringify(state.sort())){
        setState(tempState)
      }
    }else{
      const tempState = state.map((value,index) => {
        return {
          ...value,
          value:blueGrid[deduceIndex(index)]
        }
      })
      if(JSON.stringify(tempState.sort()) != JSON.stringify(state.sort())){
        setState(tempState)
      }
    }

    //第三步，监听消消乐
    if(type==GameStep.UPDATE_STEP){
      //需要被更新的轮次（红方轮次蓝方轮次）
      let toBeUpdatedTurn = gameState.toBeUpdated
      const updateType = gameState.updateType
      //监听到对手发出的消消乐事件，对己方棋盘进行更新
      if(updateType == UpdateType.XIAO){
        if(gameState.toBeUpdated != turn){
          const clearArray:any[] = gameState.modifiedAt
          let newArray:any[] = []
          //如果棋盘的主题色为蓝，则更新红方数据，发送红方数据更新事件，反之亦然
          if(theme == 'blue'){
            newArray = Array.from(redGrid)
            clearArray.forEach((value,index) => {
              newArray[value] = null
            })
            store.dispatch(doCurrentStepUpdate(blueGrid,newArray,undefined,toBeUpdatedTurn))
          }else{
            newArray = Array.from(blueGrid)
            clearArray.forEach((value,index) => {
              newArray[value] = null
            })
            store.dispatch(doCurrentStepUpdate(newArray,redGrid,undefined,toBeUpdatedTurn))
          }
        }
      }
    }

  })


  //模块按键触发事件
  function onClick(index:number, isEmpty:boolean){
    if(!optAble){
      return;
    }
    if(!isEmpty){
      wx.showToast({
        title:'这里已经有棋子啦！',
        icon:'error',
        duration:1000
      })
      return;
    }
    let grid:any[] = []
    //根据棋盘的颜色判断如何发送更新事件
    if(theme == 'red'){
      grid = Array.from(blueGrid)
      grid[deduceIndex(index)] = value
      store.dispatch(doCurrentStepUpdate(grid,redGrid,deduceIndex(index),undefined))
    }else{
      grid = Array.from(redGrid)
      grid[deduceIndex(index)] = value
      store.dispatch(doCurrentStepUpdate(blueGrid, grid,deduceIndex(index),undefined))
    }
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
