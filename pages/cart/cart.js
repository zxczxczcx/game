// pages/cart/cart.js
const app = getApp()

const xcx_url = app.globalData.xcx_url;
const carts = [];

Page({

 /**
   * 页面的初始数据
   */
  data:{
    totalpriceAll:0,
    selectAll:false,
    select_id:[],
    checked:false,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getCartInfo();          //加载购物车
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
    this.getCartInfo();          //加载购物车
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
   * 加载购物车
   */
  getCartInfo: function () {
    let _this = this 
    let token = wx.getStorageSync('token');
    //发送请求
    wx.request({
      url: xcx_url+'/GetCart',
      data:{
        token:token
      },
      success:function(res){
        // console.log(res.data)
        _this.setData({
          carts: res.data,
        })
      }
    })
  },

  /**
   * 全选事件   以及 反选
   */
  selectAll:function (e) {
    console.log(this.data)
    let list = this.data.carts
    let all = !this.data.selectAll
    let total = 0;
    list.forEach((item)=>{
      if(all){
        item.checked=true
        total += item.shop_price*item.cart_num       //从  item 中取值
      }else{
        item.checked=false
      }
    })
    this.setData({
      carts:list,             //页面赋值
      selectAll:all,           //绑定字段
      totalpriceAll:total       //赋值
    })
  },

  /**
   * 单选
   */
  selectGoods:function(e) {
    let select_id = e.detail.value      //获取当前点击的商品id
    let list = this.data.carts      //获取当前购物车的商品
    let total = 0;
    let selectAll = false;
    list.forEach(item=>{          //循环商品
      // console.log(item)
      item.checked=false        
      select_id.forEach(function(item2){        //循环
        // console.log(item2)
        if(item2==item.goods_id){
          total +=item.shop_price*item.cart_num           //单选价格 
          item.checked = true
        }else if(list.length==select_id.length){
          selectAll=true;
        }
      })
      //设置价格
      this.setData({
        totalpriceAll:total,         //赋值
        selectAll:selectAll,
      })
    })
  },

  /**
   * 加数量   +
   */
  incrgoods:function(e) {
    let list = this.data.carts
    let index = e.currentTarget.dataset.goodsindex            //被选中的  索引下标
    //TODO
    list[index].cart_num++                        //商品当前数量
    let total = 0;
    list.forEach(item=>{
      if(item.checked==true){
        total +=item.cart_num*item.shop_price
      }
    })
    let token = wx.getStorageSync('token')
    wx.request({
      url: xcx_url+'/decr?token='+token,
      method:'post',
      data:{
        gid:list[index].goods_id,
        num:list[index].cart_num
      }
    })
    this.setData({
      carts:list,
      totalpriceAll:total,
    })
  },

  /**
   * 减一
   */
  decrgoods:function(e) {
    let list = this.data.carts
    let index = e.currentTarget.dataset.goodsindex            //被选中的  索引下标
    //TODO
    list[index].cart_num--                        //商品当前数量
    let total = 0;
    
    list.forEach(item=>{
      if(item.checked==true){
        total +=item.cart_num*item.shop_price
      }
    })
    let token = wx.getStorageSync('token')
    wx.request({
      url: xcx_url+'/decr?token='+token,
      method:'post',
      data:{
        gid:list[index].goods_id,
        num:list[index].cart_num
      }
    })
    
    this.setData({
      carts:list,
      totalpriceAll:total,
    })
  },

  /**
   * 删除
   */
  Cartdel:function(e){
    let _this = this
    let token = wx.getStorageSync('token')
    let list = _this.data.carts           //获取当前购物车的商品
    let selectGoodsId = [];
    console.log(list)
    list.forEach(item=>{
      if(item.checked==true){
        selectGoodsId.push(item.goods_id)
      }
    })
    if(selectGoodsId.length>0){
      //微信提示框
      wx.showModal({
        title: '提示',
        content: '是否删除选中的商品',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 请求购物城商品的接口
            console.log(selectGoodsId)
            wx.request({
              url:xcx_url+'/delgoods?token='+token,
              method:'post',
              data:{
                goods:selectGoodsId.toString(),
              },
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              success:function(e){
                _this.getCartInfo();
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      
    }else{
      //没有删除 的选项
      wx.showToast({
        icon:'none',
        title: '请选者要删除的商品',
      })
    }
    
    
    

  }
})