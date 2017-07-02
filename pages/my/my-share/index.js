var app = getApp();
var util = require('../../../utils/util.js')

Page({
	data:{
    reports:[],
    tips: '',
  },
  gotoAddShare(){
    wx.navigateTo({
      url: '../../share/add/index',
    })
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
  onLoad: function (options) {
    var self=this;

    wx.setNavigationBarTitle({
		  title: options.isOpen=='true' ? '我的分享' : '我的反馈'
		});

    self.setData({
      tips: options.isOpen == 'true' ? '快点去分享吧' : '暂无反馈'
    })

    (function shared(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/project/refReports',
        method: 'POST',
        data: {
          wxappSessionId: wx.getStorageSync('wxappSessionId'),
          isOpen: options.isOpen
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
  },
  gotoProjectDetailView: function(e){
    var projectId = e.currentTarget.dataset.id
    var projectType = e.currentTarget.dataset.type

    var url = '';
    if(projectType==1){ //项目类型为活动
      url = '../../taste/detail/activity/index'
    }

    wx.navigateTo({
      url: url + '?projectId='+ projectId
    })
  }
})