import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[]//保存加入购物车的数据
  },
  mutations: {
    addList:function(state,val)
    {
      //将当前点击的商品加入购物车 （保存到 localStorage）
      //  var list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

       var findList = state.list.find(function(item){
           return val.id == item.id
       })
       
       

       //如果商品是第一次加入购物车，商品数量为1
       if(!findList){
          Vue.set(val,'count',1)
          state.list.push(val)
       }
       //如果商品是再次加入购物车，商品数量加1
       else
       {
         if(findList.count < 5) findList.count ++
       }
       
      
       
       //将list保存到 localStorage
      //  localStorage.setItem('list',JSON.stringify(list))
    },
    //数量减一
    sub:function(state,id) {
       //查找对应id 的商品
       var findList = state.list.find(function(item) {
         return item.id == id
       })
       if(findList){
          if(findList.count > 1) findList.count --
       }
       //存储更改后的数据到 localStorage
      //  localStorage.setItem('list',JSON.stringify(this.list))
    },
    //数量加一
    add:function(state,id) {
       //查找对应id 的商品
       var findList = state.list.find(function(item) {
         return item.id == id
       })
       if(findList){
          if(findList.count < 5) findList.count ++
       }
       //存储更改后的数据到 localStorage
      //  localStorage.setItem('list',JSON.stringify(this.list))
    },
  },
  actions: {

  }
})
