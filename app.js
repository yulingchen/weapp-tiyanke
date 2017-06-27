//app.js
App({
  globalData: {
    userInfo: null
  },

  onLaunch: function() {
    var self = this

    //登录
    if(!wx.getStorageSync('wxappSessionId')){
      this.login(function(isUserSave){
        self.getUserInfo(isUserSave)
      })
    }else{
      this.checkLogin(function(isUserSave){
        self.getUserInfo(isUserSave)
      })
    }
  },

  login(cb){
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://m.tiyanke.com/weapp/login',
            data: {
              code: res.code
            },
            success: function(res) {
              wx.setStorageSync('wxappSessionId', res.data.data.sessionid)
              typeof cb == "function" && cb(res.data.data.isSave)
            }
          })
        } else {
          wx.showToast({
            title: '获取用户登录态失败！' + res.errMsg,
            duration: 3000
          })
        }
      }
    })
  },

  checkLogin(cb){
    var self = this
    wx.checkSession({
      success: function(){
        typeof cb == "function" && cb(false)
      },
      fail: function(){
        self.login(cb)
      }
    })
  },

  getUserInfo: function(isUserSave, cb) {
    var self = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          if(!isUserSave){
            wx.request({
              url: 'https://m.tiyanke.com/weapp/saveuser',
              method: 'POST',
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                wxappSessionId: wx.getStorageSync('wxappSessionId')
              }
            })
          }
          
          self.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(self.globalData.userInfo)
        }
      })
    }
  }
})
