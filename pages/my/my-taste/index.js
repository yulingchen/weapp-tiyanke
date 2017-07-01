Page({
  data:{
    projects:[]
  },
  gotoDetailView: function(e){
    var projectId = e.currentTarget.dataset.id
    var projectType = e.currentTarget.dataset.type

    var url = '';
    if(projectType==1){ //项目类型为活动
      url = '../../taste/detail/activity/index'
    }

    wx.navigateTo({
      url: url + '?projectId='+ projectId
    })
  },

  onLoad: function (option) {
    var self=this;

    (function enrolled(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/project/enrolled',
        method: 'POST',
        data: {
          wxappSessionId: wx.getStorageSync('wxappSessionId')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if(res.statusCode==401){
            app.login(enrolled)
            return;
          }

          self.setData({
            projects: res.data.data
          })
        }
      })
    })()
  }
})