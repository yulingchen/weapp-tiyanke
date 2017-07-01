var app = getApp();
var util = require('../../../utils/util.js')

Page({
	data:{
    reports:[]
  },
  onLoad: function () {
    var self=this;

    (function shared(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/project/refReports',
        method: 'POST',
        data: {
          wxappSessionId: wx.getStorageSync('wxappSessionId')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if(res.statusCode==401){
            app.login(shared)
            return;
          }

          self.setData({
	          reports: res.data.data.map(function(report){
	            report.report_time = util.formatTime(new Date(report.report_time))
	            return report
	          })
	        })
        }
      })
    })()
  }
})