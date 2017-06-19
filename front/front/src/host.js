'use strict';
export default function() {
  var urlObj = {
    dev: {
      api: '',
      toLoginUrl:''
    },
    test: {
      api: 'http://pan.noxxxx.com/api/',
      toLoginUrl:''
    },
    release: {
      api: '',
      toLoginUrl:''
    }
  };
  var environment = 'test';
  return urlObj[environment];
}
