/**
 * Created by 1 on 2017/4/17.
 */
import {applyMiddleware, createStore} from "redux";
import rootReducer from "reducers/index";
import thunkMiddleware from "redux-thunk";
import {routerMiddleware} from "react-router-redux";
import {createLogger} from "redux-logger";
// Apply the middleware to the store
import {hashHistory} from "react-router";
const middleware = routerMiddleware(hashHistory);
const isdebug = process.env.NODE_ENV !== "production";
export default function configureStore(initialState) {
    if (initialState) {

        const store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(middleware, thunkMiddleware, createLogger())
        );
        return store;
    } else {
        const store = createStore(
            rootReducer,
            applyMiddleware(middleware, thunkMiddleware, createLogger())
        );
        return store;
    }

}