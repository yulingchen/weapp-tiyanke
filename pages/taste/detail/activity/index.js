var WxParse = require('../../../../assets/wxParse/wxParse.js');

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
  }
})