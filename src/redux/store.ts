import { configureStore } from '@reduxjs/toolkit'
import combineReducer from './combineReducer'

/**
 *
 * @author csq
 */

export default configureStore({
    reducer:{
        combineReducer
    }
})