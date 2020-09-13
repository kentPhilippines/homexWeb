/**
 * 判断是否是空
 * @param v
 * @returns {boolean}
 */
function isEmpty (v) {
  return v === null || v === '' || v === undefined || v === 'undefined' || Object.prototype.toString.apply(v) === '[object Array]' && !v.length
}

/**
 * 是否是空对象
 * @param obj
 * @returns {boolean}
 */
function isEmptyObject (obj) {
  return !obj || Object.keys(obj).length === 0
}

export {
  isEmpty,
  isEmptyObject
}
