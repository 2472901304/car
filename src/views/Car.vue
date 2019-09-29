<template>
    <div class="car">
         <div class="header">
            <h4>购物车</h4>
         </div>
         <div class="carList" v-if="list.length > 0">
            <div class="carItem" v-for="(item,index) in list" :key="index">
                <div class="catPic">
                    <img :src="item.pic" alt="">
                </div>
                <div class="carText">
                    <div class="name">{{item.name}}</div>
                    
                    <div class="price">单价: <span>￥{{item.price}}</span></div>
                </div>
                <div class="btn">
                  <span @click="sub(item.id)">-</span>  
                  {{item.count}} 
                  <span @click="add(item.id)">+</span></div>
            </div>
        
        </div>
        <div class="empty" v-else>
           <img src="../assets/images/没有更多.png" alt="">
           <div>您的购物车还是空的哦！</div>
        </div>
        <div class="footer">
            <div class="L">总数：{{total}}</div>
            <div class="C">总价：{{totalPrice}}</div>
            <div class="R"><router-link to="/address">去结算</router-link></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations , mapState } from 'vuex'
export default {
  data:function(){
     return {
        
     }
  },
  //计算属性
  computed:{
    //计算总数
      total:function()
      {
        return this.list.reduce(function(t,i){return t + i.count},0)
      },
      //计算总价
      totalPrice:function()
      {
        return this.list.reduce(function(t,i){ return t + i.price*i.count},0)
      },
      ...mapState(['list'])
  },
  methods:{
    
     tz:function()
     {
       this.$router.push('/address');
     },
     ...mapMutations(['sub','add'])
  },
  mounted:function(){
      this.list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  }
}
</script>

<style scoped>
.car{
  width: 100%;
  height:100%;
  box-sizing: border-box;
}
.car .header{
  width: 100%;
  padding: 15px 15px;
}

 .car .carList .carItem{
  display: flex;
  margin: 15px 15px;
  position: relative;
}
 .car .carList .carItem .catPic{
  width:30%;
  margin: 0 10px;
}
 .car .carList .carItem .catPic img{
  width:100%;
}
 .car .carList .carItem .carText{
  width:70%;
}
 .car .carList .carItem .carText .name{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}
 .car .carList .carItem .carText .price{
  line-height: 30px;
  color:#ccc;
}
 .car .carList .carItem .carText .price span{
  color:red;
}
 .car .carList .carItem .btn{
  position: absolute;
  right:0;
  bottom: 0;
  padding: 0 15px;
}
.car .carList .carItem .btn span{
 display: inline-block;
 width: 20px;
 height:20px;
 border:solid 1px #ccc;
 border-radius: 50%;
 text-align: center;
 line-height: 20px;
}
.car .emoty{
  display: flex;
  padding-top: 30px;
  flex-direction: column;
  
  align-items: center;
  line-height: 50px;
  font-size: 14px;
}
.car .footer{
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  height:50px;
  background:#ccc;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
}
.car .footer .L{
  flex:1;
  text-align: center;
}
.car .footer .C{
  flex:1;
  text-align: center;
}
.car .footer .R{
  flex:1;
  background:cyan;
  text-align: center;
}
</style>