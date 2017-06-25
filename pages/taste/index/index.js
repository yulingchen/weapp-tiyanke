//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  // 跳转到资讯页面
  pushStoreView: function(){
    wx.navigateTo({
      url: '../../store/index/index'
    })
  },

  // 跳转到资讯页面
  pushNewsView: function(){
    wx.navigateTo({
      url: '../../news/index/index'
    })
  },

  // 跳转到体验分类页面
  pushCategoryView: function(){
    wx.navigateTo({
      url: '../category/index'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
