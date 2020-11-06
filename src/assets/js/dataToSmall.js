import pako from './pako.min.js';

function unzipXv(key) {
  // 将二进制字符串转换为字符数组
  const charData = key.split('').map(x => x.charCodeAt(0));
  // 将数字数组转换成字节数组
  const binData = new Uint8Array(charData);
  const data = pako.inflate(binData);
  const strings = Utf8ArrayToStr(data);
  // var strings = unescape(key);
  return strings;
}

var Utf8ArrayToStr = function (array) {
  let out = '';
  let i = 0;
  const len = array.length;
  let char1; 
  let char2; 
  let char3; 
  let char4;
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
