//index.js
const app = getApp()
const db = wx.cloud.database();
let goodsC=db.collection('goods');
Page({
  data: {
      goodsList:[]
  },

  onLoad: function() {
    goodsC.where({
      lotteryFlag: false,
    })
    .get().then(res => {

      app.log(res.data)
      this.myTime(res.data)
      this.setData({
        goodsList:res.data
      })
    }).catch(e=>{
      console.log('查询失败'+e)
    })
    
  },



  //图片浏览函数
  reviewImages:(e)=>{
  
    wx.previewImage({
      current:e.currentTarget.dataset.src , // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src ] ,// 需要预览的图片http链接列表
    })

  },

  addNew:(e)=>{
    app.log(11)
    // goodsC.add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //      bookingNum:100,
    //      bookingPepId:[],
    //      exchangeNum:90,
    //      img:'http://img.173kz.com/FileUpload/ProductImgMobile/2017/07/170713146855/1707131468557164.jpg',
    //      lotteryFlag:false,
    //      name:'养无极 补肺丸 9g*10丸*4板 呼吸科',
    //      numberOnline:1100,
    //      oldPrice:111,
    //      price:29,
    //      time:''
    //   }
    // })
    // .then(res => {
    //   console.log("插入成功")
    // }).catch(e=>{
    //   console.log("插入sb"+e)
    // })
  },

    //时间处理函数
    myTime:(list)=>{
     
      for (let i = 0; i < list.length; i++) {
        let ss=''
        let time=list[i].time.toTimeString().split(':')[0]+'点';
        let data=list[i].time.toLocaleDateString().split('/');

        ss=data[1]+'月'+data[2]+'日'+time
        
        list[i].time=ss
        
      }

      
    },


})
