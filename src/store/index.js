import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    pantry: {
      items: [],
    },
    schedule: {
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

      localStorage.setItem('pantry', JSON.stringify(state.pantry))
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    addToSchedule(state, item) {
      const exists = state.schedule.items.filter(i => i.meal.id === item.meal.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.schedule.items.push(item)
      }

      localStorage.setItem('schedule', JSON.stringify(state.schedule))
    },
    addMealToCart(item) {
      const products = item.meal.items
      for (let index = 0; index < products.length; index++) {
        const product = products[index];
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
  }
})
