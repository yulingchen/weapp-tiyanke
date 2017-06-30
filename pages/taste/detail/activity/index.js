var WxParse = require('../../../../assets/wxParse/wxParse.js');
var app = getApp();

Page({
	data:{
		project:{}
	},
  onLoad: function (option) {
  	var self = this;
  	wx.request({
		  url: 'https://m.tiyanke.com/experience/project/detail', 
		  data:{
		  	projectId: option.projectId
		  },
		  success: function(res) {
		  	var project = res.data.data
		  	wx.setNavigationBarTitle({
				  title: project && project.title
				})

				WxParse.wxParse('detail', 'html', project.content, self, 5);
		    self.setData({
		    	project: project
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