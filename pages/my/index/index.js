var app = getApp();

Page({
  data:{
    userInfo: {},
  },

  gotoMyShare: function (e) {
    wx.navigateTo({
      url: '../my-share/index'
    })
  },
 

  gotoMyTaste: function () {
    wx.navigateTo({
      url: '../my-taste/index'
    })
  },
 
  gotoTasteLincense: function () {
    wx.navigateTo({
      url: '../taste-lincense/index'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    
    app.getUserInfo(function (userInfo) {
     
      that.setData({
        userInfo: userInfo
      })
    })
  }
})