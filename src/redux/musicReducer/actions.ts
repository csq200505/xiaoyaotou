/**
 *
 * @author csq
 */
export const muteAct = () => ({
    type:'TO_MUTE',
    state:true
})

export const unMuteAct = () => ({
    type:'TO_UNMUTE',
    state:false
})