Page({
	data:{
		categorys:[], 
	  mainCategorys:[], 
	  mainIndex:0
	},
  onLoad: function () {
  	var self=this
    wx.request({
		  url: 'https://m.tiyanke.com/experience/classes', 
		  success: function(res) {
		    console.log(res.data)
		    self.setData({
		    	categorys: res.data.data, 
		      mainCategorys: res.data.data.filter(function(category){
			    	return category.parent_id==''
			    })
		    })
		  }
		})
  },
  pushActivityDetailView: function(){
    wx.navigateTo({
      url: '../list/index'
    })
  }
})