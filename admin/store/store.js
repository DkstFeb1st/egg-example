/**
 * Created by 1 on 2017/4/17.
 */
import {applyMiddleware, createStore} from "redux";
import rootReducer from "reducers/index";
import thunkMiddleware from "redux-thunk";
import {routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {createLogger} from "redux-logger";
// Apply the middleware to the store
import {browerHistory, hashHistory} from "react-router";
const middleware = routerMiddleware(hashHistory);

export default function configureStore(initialState) {
    console.log(initialState)
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(middleware, thunkMiddleware, createLogger())
    );
    return store;
}