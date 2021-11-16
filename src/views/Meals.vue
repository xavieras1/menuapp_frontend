<template>
    <div class="page-meals">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Meals</h2>

                <!--h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2-->
            </div>

            <ProductBox 
                v-for="meal in meals"
                v-bind:key="meal.id"
                v-bind:product="meal" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'
export default {
    name: 'Meals',
    components: {
        ProductBox
    },
    data() {
        return {
            meals: []
        }
    },
    mounted() {
        this.getMeals()
        document.title = 'Meals | Menu A&A'
    },
    methods: {
        async getMeals() {
            this.$store.commit('setIsLoading', true)
            await axios
                .get('https://a-y-a-menu.herokuapp.com/api/v1/meals/')
                .then(response => {
                    this.meals = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>