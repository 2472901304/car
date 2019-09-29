<template>
   <div class="Address">
       <div class="block">
          <div class="title">收货地址</div>
          <div class="text" :class="{active : iNow == index}" @click="click(index)" v-for="(item,index) in addressList" :key="index">{{item.address}}</div>
       </div>
       <div class="pay">
          <div class="title">支付方式</div>
          <div class="text" :class="{active : iPay == index}" @click="click2(index)" v-for="(item,index) in payList" :key="index">
             {{item.pay}}
             <img :src="item.pic"/>
            </div>
       </div>

       <div class="carList">
          <div class="title">商品列表</div>
          <div class="text" v-for="(item,index) in list" :key="index">
             <div class="t-pic"><img :src="item.pic"/></div>
             <div class="t-name">
                <p>{{item.name}}</p>
                <p>再来哦</p>
               </div>
             <div class="t-count">x{{item.count}}</div>
             <div class="t-price">{{item.price}}</div>
          </div>
       </div>
       


       <div class="footer">
            
            <div class="C">总价：{{totalPrice}}</div>
            <div class="R"><router-link to="/address">去结算</router-link></div>
        </div>
   </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data:function()
    {
       return {
          addressList:[
             {id:1,address:'河南省-开封市-上帝之巅'},
             {id:2,address:'河南省-开封市-太平天国'},
             {id:3,address:'河南省-开封市-密西西比'},
          ],
          payList:[
               {
                  id:1,
                  pay:'微信',
                  pic:require('../assets/images/微信.png')
               },
               {
                  id:2,
                  pay:'支付宝',
                  pic:require('../assets/images/支付宝认证.png')
               },
               {
                  id:3,
                  pay:'银联',
                  pic:require('../assets/images/支付平台-银联.png')
               },
          ],
          iNow:0,//默认选中 地址
          iPay:0, //默认支付方式
          

       }
    },
    computed:{
        //计算总价
      totalPrice:function()
      {
        return this.list.reduce(function(t,i){ return t + i.price*i.count},0)
      },
      ...mapState(['list'])
    },
    methods:{
       click:function(index)
       {
          this.iNow = index
       },
       click2:function(index)
       {
          this.iPay = index
       }
    },
   mounted:function(){
      this.list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  }
}
</script>

<style scoped>
.Address{
   width: 100%;
   height:100%;
   background:#ccc;
   box-sizing: border-box;
   
}
.Address .block{
   margin:20px;
   line-height: 50px;
   padding: 15px;
   background:#fff;
}
.Address .block .title{
   font-weight: bold;

}
.Address .block .text{
   border-top: solid 1px #ccc;
   
}
.Address .block .text.active{
   background-image: url('../assets/images/check.png');
   background-repeat: no-repeat;
   background-position: right;
   background-size: 24px;
}
.Address .pay{
   margin:20px;
   line-height: 50px;
   padding: 15px;
   background:#fff;
}
.Address .pay .title{
   font-weight: bold;

}
.Address .pay .text{
   border-top: solid 1px #ccc;
   display: flex;
   align-items: center;
}
.Address .pay .text img{
   width: 30px;
   margin-left: 20px;
}
.Address .pay .text.active{
   background-image: url('../assets/images/check.png');
   background-repeat: no-repeat;
   background-position: right;
   background-size: 24px;
}

.Address .carList{
   margin:20px;
   line-height: 50px;
   padding: 15px;
   background:#fff;
}
.Address .carList .title{
   font-weight: bold;
}
.Address .carList .text{
   border-top: solid 1px #ccc;
   display: flex;
   align-items: center;
   justify-content: space-around;
}
.Address .carList .text .t-pic{
   width:15%;
  margin: 10px 10px;
}
.Address .carList .text .t-pic img{
   width: 100%;
}
.Address .carList .text .t-name{
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   width: 30%;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   }



.Address  .footer{
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

.Address  .footer .C{
  flex:3;
  text-align: center;
}
.Address  .footer .R{
  flex:1;
  background:lightgreen;
  text-align: center;
}
</style>