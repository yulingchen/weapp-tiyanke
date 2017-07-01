Page({
  data:{
    files: [],
    list:[]

    //默认未获取地址
    // hasLocation: false,
    // location: {},
  },

  onLoad: function () {
    var self = this;

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
            list: res.data.data.map(function(project,index){
              return {
                checked: index===0,
                name: project.title,
                value: project.projectId
              }
            })
          })
        }
      })
    })()
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.list;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      list: radioItems
    });
  },

  publish(e){
    var self = this;
    var projectId = this.data.list.find(project=>!!project.checked).value;
    var report_text = e.detail.value.report_text;
    var report_photos=[];

    if(!report_text){
      wx.showToast({title: '请输入分享的内容'})
      return;
    }

    var files = this.data.files.concat();
    if(files.length>0){
      function upload(){
        var file = files.shift()
        if(file){
          wx.uploadFile({
            url: 'https://m.tiyanke.com/experience/project/report/uploadfile', 
            filePath: file,
            name: 'file',
            success: function(res){
              var data = JSON.parse(res.data).data;
              report_photos.push('https://m.tiyanke.com/uploads'+ data.file[0].fd.replace(data.path,''));

              if(report_photos.length<self.data.files.length){
                upload();
              }else{
                report();
              }
            }
          })
        }
      }
      upload();
    }else{
      report();
    }

    function report(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/project/report',
        method: 'POST',
        data: {
          projectId: projectId,
          report_text: report_text,
          report_photos: report_photos,
          wxappSessionId: wx.getStorageSync('wxappSessionId'),
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if(res.statusCode==401){
            app.login(report)
            return;
          }

          if(res.data.result){
            wx.showToast({title: '分享成功'})
            wx.reLaunch({
              url: '../index/index'
            })
          }else{
            wx.showToast({title: res.data.msg})
          }
        }
      })
    }
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  //获取经纬度
  // getLocation: function (e) {
  //   var that = this
  //   wx.getLocation({
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({
  //         hasLocation: true,
  //         location: {
  //           longitude: res.longitude,
  //           latitude: res.latitude
  //         }
  //       })
  //     }
  //   })
  // }
 
})