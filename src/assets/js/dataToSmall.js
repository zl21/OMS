import pako from './pako.min.js'

function unzipXv(key) {
  // 将二进制字符串转换为字符数组
  var charData = key.split('').map(function (x) {
    return x.charCodeAt(0);
  });
  // 将数字数组转换成字节数组
  var binData = new Uint8Array(charData);
  var data = pako.inflate(binData);
  var strings = Utf8ArrayToStr(data);
  // var strings = unescape(key);
  return strings;
}

var Utf8ArrayToStr = function (array) {
  var out = "",
    i = 0,
    len = array.length,
    char1, char2, char3, char4;
  while (i < len) {
    char1 = array[i++];
    if (char1 >> 4 <= 7) {
      out += String.fromCharCode(char1);
    } else if (char1 >> 4 == 12 || char1 >> 4 == 13) {
      char2 = array[i++];
      out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
    } else if (char1 >> 4 == 14) {
      char2 = array[i++];
      char3 = array[i++];
      char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6);
      out += String.fromCharCode(char4 | ((char3 & 0x3F) << 0));
    }
  }
  return out;
};

export default unzipXv;
