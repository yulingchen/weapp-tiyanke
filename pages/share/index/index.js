var app = getApp();
var util = require('../../../utils/util.js')

Page({
  data:{
    reports:[],
    userInfo: {}
  },
  previewImage: function (e) {
    var that = this,
      index = e.currentTarget.dataset.imgindex,
      pictures = e.currentTarget.dataset.pictures;
    wx.previewImage({
      current: pictures[index],
      urls: pictures
    })
  },
  onLoad: function () {
    var self=this
    this.setData({
      userInfo: app.globalData.userInfo
    })

    wx.request({
      url: 'https://m.tiyanke.com/experience/project/reports', 
      success: function(res) {
        self.setData({
          reports: res.data.data.map(function(report){
            report.report_time = util.formatTime(new Date(report.report_time))
            return report
          })
        })
      }
    })
  },
  // gotoDetails(e){
  //   let data = e.target.dataset
  //   wx.navigateTo({
  //     url: '../details/index',
  //   })
  // },
  publishShare(){
    wx.navigateTo({
      url: '../add/index',
    })
  },
})