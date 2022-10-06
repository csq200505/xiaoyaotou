/**
 *
 * @author csq
 */

export enum GameStep {
    //游戏初始化
    INTITIAL_GAME = "INITIAL_GAME",
    //蓝方置骰
    BLUE_TURN = "BLUE_TURN",
    //红方置骰
    RED_TURN = "RED_TURN",
    //游戏结束，结算开始
    GAME_SET = "GAME_SET",
    //红方获胜
    RED_WIN = "RED_WIN",
    //蓝方获胜
    BLUE_WIN = "BLUE_WIN",
    //平局
    TIED = "TIED",
    //仅作为对上一状态的更新中间态
    UPDATE_STEP = "UPDATE_STEP"
}

export enum UpdateType{
    NORMAL='normal',
    XIAO = 'xiaoxiaole',
    GET_RANDOM = 'get_random'
}

//游戏状态
export interface GameState {
    gridBlue:any[],
    gridRed:any[],
    type:GameStep,
    toBeUpdated?:GameStep,
    updateType?:UpdateType,
    //修改位置
    modifiedAt?:any,
    //现在游戏的随机值，仅存在于两个turn的状态中
    currentValue?:number
}

const initialState:GameState = {
    gridBlue:[null,null,null,null,null,null,null,null,null],
    gridRed:[null,null,null,null,null,null,null,null,null],
    type:GameStep.INTITIAL_GAME,
}

const game = (state:GameState = initialState, action:any) => {
    switch(action.type){
        case GameStep.INTITIAL_GAME:
            return initialState
        case GameStep.UPDATE_STEP:
            if(action.updateType==UpdateType.XIAO){
                return {
                    gridBlue:state.gridBlue,
                    gridRed:state.gridRed,
                    type:action.type,
                    toBeUpdated:action.toBeUpdated,
                    updateType:action.updateType,
                    currentValue:state.currentValue,
                    modifiedAt:action.modified==undefined?undefined:action.modified
                }
            }else{
                return {
                    gridBlue:action.gridBlue,
                    gridRed:action.gridRed,
                    type:action.type,
                    toBeUpdated:action.toBeUpdated==undefined?state.type:action.toBeUpdated,
                    updateType:action.updateType,
                    currentValue:state.currentValue,
                    modifiedAt:action.modified==undefined?undefined:action.modified
                }
            }    
        case GameStep.GAME_SET:
            return{
                gridBlue:state.gridBlue,
                gridRed:state.gridRed,
                type:action.type
            }
        case GameStep.BLUE_TURN:
        case GameStep.RED_TURN:
            return{
                gridBlue:state.gridBlue,
                gridRed:state.gridRed,
                type:action.type,
                currentValue:action.currentValue
            }            
        default: 
            return {
                gridBlue:state.gridBlue,
                gridRed:state.gridRed,
                type:action.type
            }
    }
}

export default game;


