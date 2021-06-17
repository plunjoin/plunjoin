'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const token = "zwuwBmGwKWh2U9I37KNKxefTtzPUn342"

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(md5);
    var timestamp = new Date().getTime();
    var md5token = md5.update(timestamp + '' + md5.update(token));
    let res = await ctx.curl("http://45.136.244.36:8888/system?action=GetSystemTotal", {
      method: "POST",
      headers: {
        cookie: './' + md5.update('http://45.136.244.36:8888') + '.cookie'
      },
      data: {
        request_time: timestamp,
        request_token: md5token,
      }
    })
    console.log(res);
    ctx.body = res;
  }
}

module.exports = HomeController;
