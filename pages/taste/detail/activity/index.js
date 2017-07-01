var WxParse = require('../../../../assets/wxParse/wxParse.js');
var util = require('../../../../utils/util.js')
var app = getApp();

Page({
	data:{
		project:{},
    users:[]
	},
  onLoad: function (option) {
  	var self = this;
  	wx.request({
		  url: 'https://m.tiyanke.com/experience/project/detail', 
		  data:{
		  	projectId: option.projectId
		  },
		  success: function(res) {
		  	var project = res.data.data.project
        var users = res.data.data.users

        project.startDateTime = util.formatTime(new Date(project.startDateTime))
        project.endDateTime = util.formatTime(new Date(project.endDateTime))
		  	wx.setNavigationBarTitle({
				  title: project && project.title
				})

				WxParse.wxParse('detail', 'html', project.content, self, 5);
		    self.setData({
		    	project: project,
          users: users
		    })
		  }
		})
  },

  enrollExp: function(e){
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

          if(res.result){
          	wx.showToast({title: '报名成功'})
          }else{
          	wx.showToast({title: res.data.msg})
          }
        }
      })
    })()
  }
})