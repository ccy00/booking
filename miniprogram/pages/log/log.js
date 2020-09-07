const app = getApp();

const db = wx.cloud.database();
const useCollection = db.collection("use");
Page({
  data: {

  },
  onLoad: function () {
    if (app.globalData.useId) {
      //全局应用已有openId
    } else {
      // 由于 login云函数 是网络请求，可能会在 Page.onLoad 之后才返回 
      // 所以此处加入 callback 以防止这种情况 
      app.openIdReadyCallback = res => {
        app.globalData.useId = res.result.openid
      }
    }
    // //从数据库获取用户信息
    // useCollection.where({
    //   _openid: app.globalData.useId
    // }).get({
    //   success: function (res) {
    //     console.log("log页面从数据库获取用户信息" );
    //     console.log(res.data)
    //     app.globalData.name = res.nickName;
    //     app.globalData.avatars = res.avatarUrl;

    //     wx.switchTab({
    //       url: '/pages/index/index'
    //     })

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.name = res.userInfo.nickName;
              app.globalData.avatars = res.avatarUrl;

              wx.switchTab({ url: '/pages/index/index'})
            }
          })
        }
        // else {
        //   //从数据库获取用户信息
        //   useCollection.where({  _openid: app.globalData.useId })
        //   .get({
        //     success: function (res) {
        //       console.log("log页面从数据库获取用户信息");
        //       console.log(res.data)
        //       app.globalData.name = res.nickName;
        //       app.globalData.avatars = res.avatarUrl;

        //       wx.switchTab({ url: '/pages/index/index' })
        //     }
        //   })

        // }

      }
        

    })


  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.name = e.detail.userInfo.nickName;
      app.globalData.avatars=e.detail.userInfo.avatarUrl;
      wx.switchTab({ url: '/pages/index/index' })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '点击授权享受更多优惠哦！',
        showCancel: false,
        confirmText: '返回授权',
      })
    }
  }

})