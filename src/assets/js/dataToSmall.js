import pako from './pako.min.js';

const Utf8ArrayToStr = function (array) {
  let out = '';
  let i = 0;
  const len = array.length;
  let char1;
  let char2;
  let char3;
  let char4;
  while (i < len) {
    char1 = array[i++];
    // eslint-disable-next-line no-bitwise
    if (char1 >> 4 <= 7) {
      out += String.fromCharCode(char1);
      // eslint-disable-next-line no-bitwise
    } else if (char1 >> 4 == 12 || char1 >> 4 == 13) {
      char2 = array[i++];
      // eslint-disable-next-line no-bitwise
      out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
      // eslint-disable-next-line no-bitwise
    } else if (char1 >> 4 == 14) {
      char2 = array[i++];
      char3 = array[i++];
      // eslint-disable-next-line no-bitwise
      char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6);
      // eslint-disable-next-line no-bitwise
      out += String.fromCharCode(char4 | ((char3 & 0x3F) << 0));
    }
  }
  return out;
};

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

export default unzipXv;
