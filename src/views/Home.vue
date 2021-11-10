<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
            Welcome to Menu Angel & Annie
        </p>
        <p class="subtitle">
            Weekly Menues
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest meals</h2>
      </div>

      <ProductBox 
        v-for="meal in latestMeals"
        v-bind:key="meal.id"
        v-bind:product="meal" />
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import ProductBox from '@/components/ProductBox'

export default {
  name: 'Home',
  data() {
    return {
      latestMeals: []
    }
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestMeals()
    document.title = 'Home | Menu A&A'
  },
  methods: {
    async  getLatestMeals() {
      this.$store.commit('setIsLoading', true)
      await axios
        .get('https://a-y-a-menu.herokuapp.com/api/v1/latest-meals/')
        .then(response => {
          this.latestMeals = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    }
  }

}
</script>