import React from "react"
import { useState, useEffect } from "react"
import { View , Image} from "remax/wechat"
import '../Block/index.css'

export interface BlockValue {
    position:number,
    theme:string,
    value?:number,
    //当且仅当被吃了之后才传入此值
    isEaten?:boolean
}

function equalProps(preProps:any, postProps:any){
    return preProps==postProps;
}

/**
 * 棋盘模块组件
 */
const blockcomp = (props:any) => {
    const href = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/'
    const value  = props.value;
    const onClick = props.onClick;
    
    //初始状态，不为空
    const [ empty, setEmpty ] = useState<boolean>(true);

    useEffect(() => {
        if(value.isEaten!==undefined&&value.isEaten&&!empty){
            setEmpty(true)
        }
        else if(value.value !== undefined){
            setEmpty(false)
        }
    },[value])
    //获取骰子图
    function getImage():string{
        if(empty){
            return href+'white-bg.png';
        }
        if(value.value==null){
            return href+'white-bg.png';
        }
        switch(value.theme){
            case 'blue':{
                return href+'r'+value.value+'.jpg'
            }
            case 'red':
            default:
            {
                return href +'b'+value.value+'.png'
            }
        }
    }
    return (
        <View className = 'block'>
            <Image onClick={() => onClick(value.position, empty)} className="block-image" src = {getImage()}></Image>
        </View>
    )
}

 export const Block = React.memo(blockcomp,equalProps);