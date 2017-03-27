/**
 * Created by 1 on 2016/1/1.
 */
import axios from 'axios';
import {HEADURL} from './util'

export function getUserListApi(){
  return axios.get(`${HEADURL}getUserInfo`)
}
