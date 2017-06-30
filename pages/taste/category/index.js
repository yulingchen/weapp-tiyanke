Page({
	data:{
		categorys:[], 
	  mainCategorys:[], 
	  subCategorys:[],
	  mainIndex:0
	},

  onLoad: function () {
  	var self=this
    wx.request({
		  url: 'https://m.tiyanke.com/experience/categorys', 
		  success: function(res) {
		    console.log(res.data)
		    var mainCategorys = res.data.data.filter(function(category){
		    	return category.parent_id==''
		    })

		    self.setData({
		    	categorys: res.data.data, 
		      mainCategorys: mainCategorys,
			    subCategorys: res.data.data.filter(category=>category.parent_id == mainCategorys[0]._id)
		    })
		  }
		})
  },

  getSubCategorys:function(e){
  	var parentCategoryIndex = e.currentTarget.dataset.index
  	var parentCategoryId = e.currentTarget.dataset.id
  	var subCategorys = this.data.categorys.filter(category=>category.parent_id == parentCategoryId)

  	this.setData({
  		mainIndex: parentCategoryIndex,
  		subCategorys: subCategorys
  	})
  },

  gotoListView: function(e){
  	var categoryId = e.currentTarget.dataset.id
  	var categoryName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../list/index?categoryId='+categoryId+'&categoryName='+categoryName
    })
  }
})