import {GameStep, GameType, UpdateType} from "."

/**
 * @author csq
 */
export const initialGameAct = (gameType:GameType) => ({
    gameType:gameType,
    type:GameStep.INTITIAL_GAME
})

export const blueTurnAct = (currentValue:number,able?:boolean) => ({
    ableToStep: able == undefined ?undefined:able,
    type:GameStep.BLUE_TURN,
    currentValue
})

export const redTurnAct = (currentValue:number) => ({
    type:GameStep.RED_TURN,
    currentValue
})

export const gameSetAct = () => ({
    type:GameStep.GAME_SET
})

export const redWinAct = () => ({
    type:GameStep.RED_WIN
})


export const blueWinAct = () => ({
    type:GameStep.BLUE_WIN,
})

export const tiedAct = () => ({
    type:GameStep.TIED
})

//提供目前状态的更新
export const doCurrentStepUpdate = (gridBlue:any[], gridRed:any[], modified:any, toBeUpdated:any) => ({
    gridBlue,
    gridRed,
    type:GameStep.UPDATE_STEP,
    toBeUpdated,
    updateType:UpdateType.NORMAL,
    modified
})

//专门进行消消乐
export const doXiaoUpdate = (modified:any[], toBeUpdated:GameStep, currentValue:any) => ({
    modified,
    toBeUpdated,
    currentValue,
    type:GameStep.UPDATE_STEP,
    updateType:UpdateType.XIAO
})


export const setAbleToStep = (able:boolean) => ({
    type:GameStep.BLUE_TURN,
    ableToStep:able
})