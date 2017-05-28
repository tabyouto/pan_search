
const isEmpty = function(obj) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;


  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};



function getDigits(num) {
  var digits = 0
    ,   parts = num.toString().split(".");

  if (parts.length === 2) {
    digits = parts[1].length;
  }

  return digits;
}

function toFixed(num, digits) {
  if (typeof digits == 'undefined') {
    return num;
  }

  return Number(num).toFixed(digits);
}


/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 *
 * @param num1加数1 | num2加数2
 */
const numAdd= function (num1, num2) {
  var baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return Math.round(num1 * baseNum + num2 * baseNum) / baseNum;
};


/**
 * 减法，避免数据相减小数点后产生多位数和计算精度损失。
 *
 * @param num1被减数  |  num2减数
 */
const numSub= function (num1, num2) {
  var baseNum, baseNum1, baseNum2;
  var precision;// 精度
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};


/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 *
 * @param num1被乘数 | num2乘数
 */
const numMulti= function (num1, num2) {
  var baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {
  }
  return Number(num1.toString().replace(".", "")) *
    Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};


/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1被除数 | num2除数
 */
const numDiv= function (num1, num2,digits) {
  // 数字化
  var num1 = parseFloat(num1).toString(),
      num2 = parseFloat(num2).toString(),
      t1 = getDigits(num1),
      t2 = getDigits(num2),
      result =  num1.replace(".", "") / num2.replace(".", "") * Math.pow(10, t2 - t1)

  return toFixed(result, digits);
};


exports.numAdd = numAdd;
exports.numSub = numSub;
exports.numMulti = numMulti;
exports.numDiv = numDiv;




exports.isEmpty = isEmpty;
