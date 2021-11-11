<template>
    <div class="page-meal">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="meal.get_image">
                </figure>

                <h1 class="title">{{ meal.name }}</h1>

                <p>{{ meal.description }}</p>
            </div>

            <div class="column is-3">
                <h2 class="subtitle">Information</h2>

                <p v-if="meal.items"><strong >Products: </strong>{{ meal.items.length }}</p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <a class="button is-dark" @click="addToSchedule()">Add to Schedule</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Products</h2>
            </div>

            <MealProductBox 
                v-for="product in meal.items"
                v-bind:key="product.product.id"
                v-bind:product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import MealProductBox from '@/components/MealProductBox'
export default {
    name: 'Meal',
    data() {
        return {
            meal: {},
            quantity: 1
        }
    },
    components: {
        MealProductBox
    },
    mounted() {
        this.getMeal() 
    },
    methods: {
        async getMeal() {
            this.$store.commit('setIsLoading', true)
            const meal_slug = this.$route.params.meal_slug
            await axios
                .get(`https://a-y-a-menu.herokuapp.com/api/v1/meals/${meal_slug}`)
                .then(response => {
                    this.meal = response.data
                    document.title = this.meal.name + ' | MENU A&A'
                })
                .catch(error => {
                    console.log(error)
                })
            
            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }
            const item = {
                meal: this.meal,
                quantity: this.quantity
            }
            this.$store.commit('addMealToCart', item)
            toast({
                message: 'The products of the meal were added to the cart',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
        },
        addToSchedule() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }
            const item = {
                meal: this.meal,
                quantity: this.quantity,
                person: "Angel",
                day: "Monday"
            }
            this.$store.commit('addToSchedule', item)
            toast({
                message: 'The meal were added to the schedule',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
        }
    }
}
</script>