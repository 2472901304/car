<template>
  <div class="home">
      <div class="header">
           <div class="pic">
              <img src="../assets/images/avatar.jpg" alt="">
           </div>
      </div>

      <div class="text">
        <p class="test">爱时尚精品屋</p>
        <p class="con">公告：欢迎光临流行爆款库存有限请尽早下单.谢谢.</p>
      </div>

      <!-- 导航 nav -->
      <div class="nav">
          <div class="nav-item" v-for="(item,index) in navList" :key="index" :class="{active: iNow == index}" @click="sort(index)">{{item}}</div>
      </div>
      <!-- 商品列表 -->
      <div class="carList">
        <div class="carItem" v-for="(item,index) in goodList" :key="index">
          <div class="catPic">
              <img :src="item.pic" alt="">
          </div>
          <div class="carText">
             <div class="name">{{item.name}}</div>
             <div class="count">已售:{{item.buyCount}}</div>
             <div class="price">单价: <span>￥{{item.price}}</span></div>
          </div>
          <div class="btn" @click="addList(item)">加入购物车</div>
        </div>
        
      </div>
      <!-- 购物车图标 -->
      <div class="scar" @click="tz()">
        <img src="../assets/images/cart.png" alt="">
        <span class="num">{{total}}</span>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
// import func from '../../vue-temp/vue-editor-bridge'
import { mapMutations,mapState } from 'vuex'
export default {
  name: 'home',
  data:function(){
     return {
        navList:["价格升序↑","价格降序↓","销量升序↑","销量升序↓"],
        goodList:[],//保存所有商品数据
        iNow:0,
     }
  },
  components: {
     
  },
  computed:{
     total:function()
     {
       return this.list.reduce(function(t,i){ return t + i.count},0)
     },
     ...mapState(['list'])
  },
  methods:{
     sort:function(index)
     {
         this.iNow = index

         if(index == 0){
            this.goodList.sort(function(a,b){
              return a.price - b.price
            })
         }else if(index == 1){
            this.goodList.sort(function(a,b){
              return b.price - a.price
            })
         }else if(index == 2){
            this.goodList.sort(function(a,b){
              return a.buyCount - b.buyCount
            })
         }else{
            this.goodList.sort(function(a,b){
              return b.buyCount - a.buyCount
            })
         }
     },
     tz:function(){
       this.$router.push('/car');
     },
     //通过mapMutations 映射函数 将 需要注入到当前组件的同步方法 注入
     ...mapMutations(['addList'])
  },
  mounted:function(){
      axios.get('https://yantianfeng.com/api/goodList').then(res=>{
        this.goodList = res.data.goodList
      })

      // this.list = localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")) : [];
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height:100%;
  position: relative;
}
.home .header{
    width: 100%;
    height:200px;
    background-image: url(../assets/images/banner-2.png) ;
    background-size: cover;
    background-position-x: center;
    position: relative;
}
.home .header .pic img{
  width: 80px;
  height:80px;
  border-radius: 50%;
  position: absolute;
  bottom:-40px;
  left:50%;
  margin-left: -40px;
  
  
}
.home .text{
  text-align: center;
 
  margin-top:50px;
}
.home .text .test{
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}
.home .text .con{
  font-size: 16px;
  line-height: 30px;
  color:#666;
}
.home .nav{
  display: flex;
  justify-content: space-around;
  line-height: 50px;
  border-bottom: solid 1px #ccc;
  margin:0 15px;
}
.home .nav .nav-item.active{
  color:red;
}
.home .carList .carItem{
  display: flex;
  margin: 30px 15px;
  position: relative;
}
.home .carList .carItem .catPic{
  width:30%;
  margin: 0 10px;
}
.home .carList .carItem .catPic img{
  width:100%;
}
.home .carList .carItem .carText{
  width:70%;
}
.home .carList .carItem .carText .name{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}
.home .carList .carItem .carText .count{
  line-height: 30px;
  color:#ccc;
}
.home .carList .carItem .carText .price{
  line-height: 30px;
  color:#ccc;
}
.home .carList .carItem .carText .price span{
  color:red;
}
.home .carList .carItem .btn{
  position: absolute;
  right:0;
  bottom: 0;
  background:red;
  color:#fff;
  padding: 0 15px;
  
}
.home .carList .carItem .btn:active{
  opacity: 0.6;
}
.home .scar{
  position:fixed;
  bottom: 18%;
  right:10%;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 60px;
  height:60px;
}
.home .scar img{
  width: 60%;
}
.home .scar .num{
  position: absolute;
  right: 0;
  top: 0;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
</style>