import { combineReducers } from "redux";
import game from "./gameReducer";
import music from "./musicReducer";

/**
 *
 * @author csq
 */
export default combineReducers({
    music,
    game
});