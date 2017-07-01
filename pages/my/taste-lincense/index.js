// pages/my/taste-lincense/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id: 1,
        name: '样板房',
      },
      {
        id: 2,
        name: '试吃',
      },
      {
        id: 1,
        name: '样板房',
      },
      {
        id: 2,
        name: '试吃',
      },
      {
        id: 1,
        name: '样板房',
      },
      {
        id: 2,
        name: '试吃',
      },
      {
        id: 1,
        name: '样板房',
      },
      {
        id: 2,
        name: '试吃',
      },
    ],
    allList: [
      {
        id: 1,
        name: '试房',
      },
      {
        id: 3,
        name: '试吃',
      },
      {
        id: 1,
        name: '试房',
      },
      {
        id: 3,
        name: '试吃',
      },
      {
        id: 1,
        name: '试房',
      },
      {
        id: 3,
        name: '试吃',
      },
      {
        id: 1,
        name: '试房',
      },
      {
        id: 3,
        name: '试吃',
      },
    ],
     
  },

  gotoLincenseForm(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../taste-lincense-form/index?id='+data.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})