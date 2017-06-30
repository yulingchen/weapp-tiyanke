Page({
  data:{
  	projects:[]
  },

  onLoad: function (option) {
  	var self=this
    wx.request({
		  url: 'https://m.tiyanke.com/experience/category/projects', 
		  data:{
		  	categoryId: option.categoryId
		  },
		  success: function(res) {
		    self.setData({
		    	projects: res.data.data
		    })
		  }
		})

		wx.setNavigationBarTitle({
		  title: option.categoryName
		})
  },

  gotoDetailView: function(e){
  	var projectId = e.currentTarget.dataset.id
  	var projectType = e.currentTarget.dataset.type

  	var url = '';
  	if(projectType==1){ //项目类型为活动
  		url = '../detail/activity/index'
  	}

    wx.navigateTo({
      url: url + '?projectId='+ projectId
    })
  }
})
