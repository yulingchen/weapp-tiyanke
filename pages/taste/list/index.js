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

  pushActivityDetailView: function(){
    wx.navigateTo({
      url: '../detail/activity/index'
    })
  }
})
