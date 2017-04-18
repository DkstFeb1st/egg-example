/**
 * Created by Dministrator on 2017/4/17.
 */

import React from "react";
import {renderToString} from "react-dom/server";
import {CreateMemoryHistory, match, RoutingContext} from "react-router";
import {Provider} from "react-redux";
import routes from "./routes";
import configureStore from "./store/store";

function* test(context) {
    console.log("test")
    yield context.render('admin')
    //context.render('admin')
}

//require('babel-polyfill')
export default function render(context) {
    const store = configureStore()
    //console.log(context.url)
    match({routes, location: context.url}, (error, redirectLocation, renderProps) => {

        //console.log(error)
        //console.log(redirectLocation)
        //console.log(renderProps)
        if (error) {
            console.log("error")
            //res.status(500).send(error.message)
        } else if (redirectLocation) {
            console.log("redirectLocation")
            //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            //console.log("renderProps")
            const store = configureStore();
            const state = store.getState();

            return Promise.all([
                //store.dispatch(fetchList()),
                //store.dispatch(fetchItem(renderProps.params.id))
            ])
                .then(() => {
                    const html = renderToString(
                        <Provider store={store}>
                            <RoutingContext {...renderProps} />
                        </Provider>
                    );
                    console.log(html)

                    return context.render('admin', {__html__: html, __state__: JSON.stringify(state)})
                    //test(context)
                    //context.render('admin')
                });
        } else {
            console.log("not found")
            //res.status(404).send('Not Found')
        }
    })
}

