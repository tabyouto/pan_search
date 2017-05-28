'use strict';
export default function() {
  var urlObj = {
    dev: {
      api: 'http://yzbackend.dev.111.com.cn/api',
      toLoginUrl:'http://yzmanage.dev.111.com.cn'
    },
    test: {
      api: 'http://pan.noxxxx.com/api/',
      toLoginUrl:'http://yzmanage.test.111.com.cn'
    },
    release: {
      api: 'http://yzadmin.111.com.cn/api',
      toLoginUrl:'http://yzmanage.111.com.cn'
    }
  };
  var environment = 'test';
  return urlObj[environment];
}
