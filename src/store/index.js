import { createStore } from 'vuex'
import axios from 'axios'

async function  updateOrderList(order_list) {
  await axios
  .post('https://a-y-a-menu.herokuapp.com/api/v1/itemslist/', order_list)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    this.errors.push('Something went wrong. Please try again')
    console.log(error)
  })
}

async function  updateSchedule(schedule) {
  await axios
  .post('https://a-y-a-menu.herokuapp.com/api/v1/schedule/', schedule)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    this.errors.push('Something went wrong. Please try again')
    console.log(error)
  })
}

export default createStore({
  state: {
    cart: {
      type: "Cart",
      items: [],
    },
    pantry: {
      type: "Pantry",
      items: [],
    },
    schedule: {
      user: 0,
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
      if (localStorage.getItem('pantry')) {
        state.pantry = JSON.parse(localStorage.getItem('pantry'))
      } else {
        localStorage.setItem('pantry', JSON.stringify(state.pantry))
      }
      if (localStorage.getItem('schedule')) {
        state.schedule = JSON.parse(localStorage.getItem('schedule'))
      } else {
        localStorage.setItem('schedule', JSON.stringify(state.schedule))
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      } 
    },
    addToPantry(state, item) {
      const exists = state.pantry.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.pantry.items.push(item)
      }
      updateOrderList(state.pantry)
      localStorage.setItem('pantry', JSON.stringify(state.pantry))
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      updateOrderList(state.cart)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    addToSchedule(state, item) {
      const exists = state.schedule.items.filter(i => (i.meal.id === item.meal.id && i.day === item.day && i.shift === item.shift ))
      if (exists.length) {
        if(exists[0].person === item.person){
          exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
        }else if(exists[0].person.length === item.person.length && exists[0].quantity === item.quantity ){
          exists[0].person.push(item.person[0])
        }
      } else {
        state.schedule.items.push(item)
      }

      updateSchedule(state.schedule)
      localStorage.setItem('schedule', JSON.stringify(state.schedule))
    },
    updateOrderList(state, type) {
      if (type==='Cart') {
        updateOrderList(state.cart)
      }else if (type==='Pantry'){
        updateOrderList(state.pantry)
      }
    },
    updateSchedule(state) {
      updateSchedule(state.schedule)
    },
    addMealToCart(item) {
      const products = item.meal.items
      for (const product in products) {
        const element = {
          product: product.product,
          quantity: item.quantity * product.quantity
        }
        this.commit('addToCart', element) 
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },  
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  },
  methods:{
  }
})
