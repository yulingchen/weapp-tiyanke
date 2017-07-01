var app = getApp()

Page({
  data:{
    projects:[]
  },

  // 跳转到达人榜页面
  pushTopView: function(){
    wx.navigateTo({
      url: '../../top/index/index'
    })
  },

  // 跳转到新手任务页面
  pushTaskView: function(){
    wx.navigateTo({
      url: '../../task/index/index'
    })
  },

  // 跳转到体验店页面
  pushStoreView: function(){
    // wx.navigateTo({
    //   url: '../../store/index/index'
    // })
    wx.showToast({title: '功能开发中'})
  },

  // 跳转到资讯页面
  pushNewsView: function(){
    // wx.navigateTo({
    //   url: '../../news/index/index'
    // })
    wx.showToast({title: '功能开发中'})
  },

  // 跳转到体验分类页面
  pushCategoryView: function(){
    wx.navigateTo({
      url: '../category/index'
    })
  },

  gotoDetailView: function(e){
    var projectId = e.currentTarget.dataset.id
    var projectType = e.currentTarget.dataset.type

    var url = '';
    if(projectType==1){ //项目类型为活动
      url = '../detail/activity/index'
    }

    wx.navigateTo({
      url: url + '?projectId='+ projectId
    })
  },

  onLoad: function (option) {
    var self=this
    wx.request({
      url: 'https://m.tiyanke.com/experience/projects/recomm', 
      success: function(res) {
        self.setData({
          projects: res.data.data
        })
      }
    })
  }
})
