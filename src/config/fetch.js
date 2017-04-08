/**
 * fetch method get data
 * Date: 2017-04-06
 */

let baseUrl = 'http://api.revan.website:88/news-at/api';

// async函数返回一个Promise对象
export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == 'GET') {
    let dataStr = ''; // 数字拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.subStr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  // fetch method
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'omit',
      method: type,
      mode: 'cors',
      cache: 'force-cache'
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    // 获取数据
    try {
      var response = await fetch(url, requestConfig);
      var responseJson = await response.json();
    } catch (error) {
      throw new Error(error)
    }

    // 返回数据
    return responseJson
  } else {
    // ajax method
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject;
    }

    let sendData = '';
    if (type == 'POST') {
      sendData = JSON.stringify(data);
    }

    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(sendData);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let obj = xhr.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
          return obj
        } else {
          throw new Error(xhr)
        }
      }
    }
  }
}
