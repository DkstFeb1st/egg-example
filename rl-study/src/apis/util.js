/**
 * Created by 1 on 2016/1/1.
 */
const debug = process.env.NODE_ENV !== 'production'
let $_SERVER = debug ? "http://" : "https://";
let $_DOMAIN = debug ? "localhost:7001/" : "app.rarcbank.com/";
export const HEADURL = $_SERVER + $_DOMAIN;
