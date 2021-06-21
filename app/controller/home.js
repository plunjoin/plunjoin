'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const token = "zwuwBmGwKWh2U9I37KNKxefTtzPUn342"

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // console.log(md5);
    // var timestamp = new Date().getTime();
    // var md5token = md5.update(timestamp + '' + md5.update(token));
    // let res = await ctx.curl("http://45.136.244.36:8888/system?action=GetSystemTotal", {
    //   method: "POST",
    //   headers: {
    //     cookie: './' + md5.update('http://45.136.244.36:8888') + '.cookie'
    //   },
    //   data: {
    //     request_time: timestamp,
    //     request_token: md5token,
    //   }
    // })

    const BT_KEY = crypto.createHash('md5').update('zwuwBmGwKWh2U9I37KNKxefTtzPUn342').digest('hex'); // 接口秘钥（在宝塔面板-面板设置-API接口-接口秘钥中获取）
    let BT_PANEL = 'http://45.136.244.36:8888'; // 面板地址 通常为36677接口 也可使用域名访问
    let nowtime = new Date().getTime().toString();
    let type = '/system?action=GetSystemTotal'; //获取网站列表为例
    BT_PANEL += type;
    let token = nowtime + BT_KEY;
    let req_token = crypto.createHash('md5').update(token).digest('hex');
    let signature = {
      request_time: nowtime,
      request_token: req_token
    };
    // console.log(crypto);
    // console.log(md5.Hash(BT_KEY));
    let query_data = { //获取网站列表query参数
    };
    let body_data = {};

    let headers = {
      "User-Agent": 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0',
    };

    // console.log(Object.assign(signature, query_data));

    let html = await ctx.curl(BT_PANEL, {
      method: "POST",
      body_data, headers
    });

    ctx.body = html;
  }
}

module.exports = HomeController;
