import React, { useEffect, useState } from 'react'
import { View, Image } from 'remax/wechat'
import '../Dice/index.css'

/**
 *
 * @author csq
 */

function getGraph(num:number):string{
    if(num == null){
        return 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/dice1.jpeg'
    }
    const url = 'https://kyky-1305486145.cos.ap-guangzhou.myqcloud.com/dice'
    return url+num+'.jpeg'

}

export default(props:any) => {

    const value = props.value

    const onClick = props.onClick

    useEffect(() => {
        setPoint(value)
    }, [props.value])

    const [ point, setPoint ] = useState<number>(0)

    return(
        <Image className='img' src = {getGraph(point)} onClick = {() => onClick()}></Image>
    )
}