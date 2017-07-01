var WxParse = require('../../../../assets/wxParse/wxParse.js');
var util = require('../../../../utils/util.js')
var app = getApp();

Page({
	data:{
		project:{},
    users:[],
    willStatus:''
	},
  onLoad: function (option) {
  	var self = this;

    (function getDetail(){
    	wx.request({
  		  url: 'https://m.tiyanke.com/experience/project/detail', 
        method: 'POST',
  		  data:{
  		  	projectId: option.projectId,
          wxappSessionId: wx.getStorageSync('wxappSessionId')
  		  },
  		  success: function(res) {
          if(res.statusCode==401){
            app.login(getDetail)
            return;
          }

  		  	var project = res.data.data.project
          project.startDateTime = util.formatTime(new Date(project.startDateTime))
          project.endDateTime = util.formatTime(new Date(project.endDateTime))
  		  	wx.setNavigationBarTitle({
  				  title: project && project.title
  				})

  				WxParse.wxParse('detail', 'html', project.content, self, 5);
  		    self.setData({
  		    	project: project,
            users: res.data.data.users,
            willStatus: res.data.data.willStatus
  		    })
  		  }
  		})
    })()
  },

  // 报名
  enrollExp: function(e){
    var self = this
  	var projectId = e.currentTarget.dataset.projectid;

  	(function enroll(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/project/enroll',
        method: 'POST',
        data: {
          projectId: projectId,
          wxappSessionId: wx.getStorageSync('wxappSessionId')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if(res.statusCode==401){
            app.login(enroll)
            return;
          }

          if(res.data.result){
          	wx.showToast({title: '报名成功'})

            var flow = self.data.project.flow
            var index = flow.indexOf('报名')
            self.setData({
              willStatus: flow[index+1]
            })
          }else{
          	wx.showToast({title: res.data.msg})
          }
        }
      })
    })()
  },

  // 分享
  shareExp: function(e){
    var projectId = e.currentTarget.dataset.projectid;
    wx.navigateTo({
      url: '../../../share/add/index?projectId='+projectId
    })
  }
})