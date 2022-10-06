/**
 *
 * @author csq
 */
export interface MusicState {
    state:boolean,
    type:string
}

const initialState:MusicState = {
    state:false,
    type:'TO_UNMUTE'
};

const music = (state:MusicState = initialState, action:any) => {
    switch(action.type){
        case 'TO_MUTE': 
        case 'TO_UNMUTE':
            return { type:action.type, state:action.state }
        default:
            return initialState;
    }
}


export default music;