//index.js
//获取应用实例
var app = getApp()
Page({
  pushActivityDetailView: function(){
    wx.navigateTo({
      url: '../detail/activity/index'
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
  }
})
