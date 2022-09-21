export function urlSearchParams(data){
  const params = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    const dataType = Object.prototype.toString.call(data[key]);
    if (dataType === '[object Object]' || dataType === '[object Array]') {
      data[key] = JSON.stringify(typeof data[key] === 'string' ? data[key].trim() : data[key]);
    }
    params.append(key, data[key]);
  });
  return params;
}