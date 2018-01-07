const CryptoJS = require('crypto-js')
const request = require('request-promise')


var score = 8888,
    level = 88,
    baoshi = 88,
    combo = 88,
    session_id = 'your id';


const signature = (data,appid) => {
    let ret = appid;
    data.forEach(item=>{
        ret += '_' + item.key + ':' + item.value;
    })

    return hash(ret);
}

function hash(str) {
    var seed = 31;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = hash * seed + str.charCodeAt(i);
        hash = hash & 0x3FFFFFF;
    }
    return hash;
}

var headers = {
    'User-Agent': 'MicroMessenger/6.6.1.1220(0x26060133) NetType/WIFI Language/zh_CN',
    'Referer': 'https://servicewechat.com/wx7a727ff7d940bb3f/14/page-frame.html',
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-cn',
    'Accept': '*/*'
}
let data = [{
    'key': 'newscore',
    'value': score
},{
    'key':'level',
    'value':level
},{
    'key':'baoshi',
    'value':baoshi
},{
    'key':'combo',
    'value':combo
}];

const appid = 'wx7a727ff7d940bb3f';

let payload = {
    'appid': appid,
    'game_behav_list': data,
    'sync_type': 1,
    'sig': signature(data,appid),
    'use_time': 2018
}
let site = 'https://game.weixin.qq.com/cgi-bin/gametetrisws/syncgame?session_id='+session_id


request({
    method: 'POST',
    url: site,
    headers: headers,
    json: true,
    body: payload
}).then(function (response) { 
    console.log(response);
}).catch(function (error) {
    console.log(error);
})
