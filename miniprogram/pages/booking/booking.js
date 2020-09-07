// pages/booking/booking.js
const app = getApp();
const db = wx.cloud.database();
const goodsC = db.collection('goods')
const useC = db.collection('use')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:0,
    goods:{},
    flag:''//判断当前活动过期与否，true是过期，false是还没,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods=JSON.parse(options.goodsJson)
   
     let now=new Date();
     let  mytime=new Date(goods.time);
  
     //断当前活动过期与否，true是过期，false是还没
     if(now>mytime)
     {
      
       //活动过期
      this.setData({
          flag:false
        })
     }
     else
     { 
       let time=mytime.getTime()- now.getTime()
         //活动没过期
      this.setData({
        flag:true,
        goods,
        time
      })
    
     }
  
     console.log(this.data.goods)


  },

    //图片浏览函数
    reviewImages(e){

      wx.previewImage({
        current:e.currentTarget.dataset.src , // 当前显示图片的http链接
        urls: this.data.goods.imgList // 需要预览的图片http链接列表
      })
  
    },
    //预定函数
    booking()
    {
      let that=this;
       let useId=app.globalData.useId;
        let goodsId=this.data.goods._id;
        const _ = db.command
        goodsC.doc(goodsId).update({
          data:{
            bookingPepId:_.push(useId)
          }
        }).then(res=>{
          console.log('用户的useId是'+useId)
          useC.where({
           
          }).get().then(res=>{
            //如果数据不存在，则插入数据
            if(JSON.stringify(res.data)==='[]')
            {
              console.log('//如果数据不存在，则插入数据')
              console.log(res.data)
              let aa=[goodsId]
              useC.add({
                data:{
                  bookingList:aa
                }
              }).then(res=>{
                aa=null;
                that.setData({
                  'goods.isBooking':true
                })
              }).catch(e=>{
                console.log('useC.add出错')
                console.log(e)
              })
            }
            //用户已存在
            else
            {
                useC.where({
                  data:{
                    _openid:useId
                  }
                }).update({
                  data:{
                    bookingList:_.push(goodsId)
                  }
                })
            }

          })
          .catch(e=>{
            console.log(' useC.where出错')
            console.log(e)
          })
        })
        .catch(e=>{
          console.log(' goodsC.doc(goodsId).update出错')
          console.log(e)
        })
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