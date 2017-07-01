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
  tapName: function (event) {
    console.log(event)
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})