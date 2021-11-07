<template>
    <div class="page-location">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ location.name }}</h2>
            </div>

            <ProductBox 
                v-for="product in location.products"
                v-bind:key="product.id"
                v-bind:product="product" />        
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import ProductBox from '@/components/ProductBox'

export default {
    name: 'Location',
    components: {
        ProductBox
    },
    data() {
        return {
            location: {
                products: []
            }
        }
    },
    mounted() {
        this.getLocation()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Location') {
                this.getLocation()
            }
        }
    },
    methods: {
        async getLocation() {
            const location_slug = this.$route.params.location_slug
            this.$store.commit('setIsLoading', true)
            axios
                .get(`https://a-y-a-menu.herokuapp.com/api/v1/products/${location_slug}/`)
                .then(response => {
                    this.location = response.data
                    document.title = this.location.name + ' | Menu A&A'
                })
                .catch(error => {
                    console.log(error)
                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>