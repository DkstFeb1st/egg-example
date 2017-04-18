/**
 * Created by Dministrator on 2017/4/17.
 */

import React from 'react'
import {renderToString} from 'react-dom/server'
import {RoutingContext, match} from 'react-router'
import {Provider} from 'react-redux'
import routes from './routes'
import configureStore from './store/store'

async function fetchAllData(dispatch, components, params) {
    const needs = components
        .filter(x => x.fetchData)
        .reduce((prev, current) => {
            return current.fetchData(params).concat(prev)
        }, [])
        .map(x => {
            return dispatch(x)
        })
    return await Promise.all(needs)
}

const render = function (req, res) {
    const store = configureStore()

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            //res.status(500).send(error.message)
        } else if (redirectLocation) {
            //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            return fetchAllData(store.dispatch, renderProps.components, renderProps.params)
                .then(html => {
                    const InitialView = (
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>)
                    const componentHTML = renderToString(InitialView)
                    const initialState = store.getState()
                    this.ctx.render('admin`', {__html__: componentHTML, __state__: JSON.stringify(initialState)})
                }).catch(err => {
                    this.ctx.render('admin', {__html__: '', __state__: {}})
                })
        } else {
            //res.status(404).send('Not Found')
        }
    })
}

module.exports = render
