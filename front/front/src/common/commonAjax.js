import axios from 'axios';
import host from '../host.js';
import qs from 'qs';

// 使用代理
const HOST = host();

//公共参数
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : '';
let commonData = {
  //debug: true,
  token: '',
  class_passwd: userInfo.class_passwd || undefined,
  class_number: userInfo.class_number || undefined
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function fetch(data) {
  var _target = {};
  Object.assign(_target, commonData, data.data);
  return axios({
    method: 'post',
    url: HOST.api + data.url,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(_target)
  }).then(function (response) {
    console.log(response.data.ret);
    if(response.data.ret == 1) {
      return response.data.data;
    }else {
      if(response.data.ret == 1111) {
        throw '遇到问题，请重试';
      }
    }
    if(response.data.ret == 1112) {
      alert('请重试');
    }
  }).catch(function (error) {

    if(!(/(Error)/.test(error))){
      alert(error);
    }else {
      alert('oh~ 请重试');
    }
    return false;
  })

}
/**
 * 搜索接口
 * @param data
 */
export function search(data) {
  return fetch({
    url: 's',
    data: data
  });
};

/**
 * 搜索某一个页面
 * @param data
 */
export function specific(data) {
  return fetch({
    url: 'specific',
    data: data
  });
};

/**
 * 获取具体课程表
 * @param data
 */
export function fetchSpecificSchedule(data) {
  return fetch({
    url: 'users/fetchSchedule',
    data: data
  });
};


/**
 * 获取token
 * @param data
 */
export function fetchToken(data) {
  return fetch({
    url: 'users/fen',
    data: data
  });
};


/**
 * 获取学位课程
 * @param data
 */
export function fetchDegreeList(data) {
  return fetch({
    url: 'users/cal',
    data: data
  });
};



//
//
//export function fetchMoviesByType(type, start=0, count=20) {
//  return fetchItemByType(`movie/${type}?start=${start}&count=${count}`)
//}
