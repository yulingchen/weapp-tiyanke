var app = getApp();

Page({
  data:{
    userInfo: {},
  },
  // 跳转到我的分享页面
  gotoMyShare: function (e) {
    wx.navigateTo({
      url: '../my-share/index'
    })
  },
 
  // 跳转到我的体验页面
  gotoMyTaste: function () {
    wx.navigateTo({
      url: '../my-taste/index'
    })
  },
  tapName: function (event) {
    console.log(event)
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})