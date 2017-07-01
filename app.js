//app.js
App({
  globalData: {
    userInfo: null
  },

  onLaunch: function() {
    var self = this

    //登录
    if(!wx.getStorageSync('wxappSessionId')){
      this.login(function(){
        self.getUserInfo(function(){
          self.collectDevice()
        })
      })
    }else{
      this.checkLogin(function(){
        self.getUserInfo(function(){
          self.collectDevice()
        })
      })
    }
  },
  onPullDownRefresh:function() {
    console.log('下拉刷新')
  }, 

  login(cb){
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://m.tiyanke.com/weapp/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function(res) {
              wx.setStorageSync('wxappSessionId', res.data.data.sessionid)
              typeof cb == "function" && cb()
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
    let wxappSessionId = wx.getStorageSync('wxappSessionId')
    wx.checkSession({
      success: function(){
        typeof cb == "function" && cb()
      },
      fail: function(){
        if(wxappSessionId){
          wx.removeStorageSync('wxappSessionId')
        }
        self.login(cb)
      }
    })
  },

  getUserInfo: function(cb) {
    var self = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          
          (function saveuser(){
            wx.request({
              url: 'https://m.tiyanke.com/weapp/saveuser',
              method: 'POST',
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                wxappSessionId: wx.getStorageSync('wxappSessionId')
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                if(res.statusCode==401){
                  self.login(saveuser)
                }
              }
            })
          })()
          
          self.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(self.globalData.userInfo)
        }
      })
    }
  },

  collectDevice: function(){
    var device = wx.getSystemInfoSync();

    (function savedevice(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/skill/collect',
        method: 'POST',
        data: {
          wxappSessionId: wx.getStorageSync('wxappSessionId'),
          origin: 'device',
          model: device.model,
          system: device.system
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if(res.statusCode==401){
            self.login(savedevice)
          }
        }
      })
    })()
  }
})
