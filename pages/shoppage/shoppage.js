// pages/shoppage/shoppage.js
//获取应用实例
const app = getApp()

const xcx_url = app.globalData.xcx_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_shoucang:0,
    goods_info: { goods_id: 1, goods_title: "商品标题1", goods_price: '100', goods_yunfei: 0, goods_kucun: 100, goods_xiaoliang: 1, content:'商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情'},
    goods_img: ['/img/k1.jpg','/img/k2.jpg','/img/k3.jpg','/img/k4.jpg'],
    indicatorDots: false,       //播报点  
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pjDataList: [{ headpic: '/img/link1.jpg', author: '佩奇', add_time: '2018-06-01', content:'好评好评，真实太好了!'},
      { headpic: '/img/link10.jpg', author: '萌萌', add_time: '2018-06-01', content: '好评好评，真实太好了!' }
    ],//评价数据
  },
 
 
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist// 需要预览的图片http链接列表  
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id=options.goods_id;
      let token =  wx.getStorageSync('token')
      let _this = this
      //发送网络请求
      wx.request({
        url: xcx_url+'/shoppage',
        data:{
            goods_id:id,
            token:token
        },
        success:function(s){
          _this.setData({
            goods:s.data,
          })
        }
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

  },

  /**
   * 加入购物车
   */
  SetCart:function(e){
      let goods_id = e.currentTarget.id
      wx.request({
        url: xcx_url+'/SetCart',
        data:{
          goods_id:goods_id,
          token:wx.getStorageSync('token')
        },
        success:function(s){
          console.log(s)
          wx.showToast({
            title: s.data.msg,
            mask:true
          })
        }
      })
  },

  /**
   * 跳转购物车
   */
  cart:function(){
    wx.switchTab({
      url: "/pages/cart/cart",
    })
  }

})