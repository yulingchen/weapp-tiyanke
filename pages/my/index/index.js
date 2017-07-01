var app = getApp();

Page({
  data:{
    userInfo: {}
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

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})