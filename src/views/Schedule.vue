<template>
    <div class="page-schedule">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Schedule</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="scheduleTotalLength">
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Quantity</th>
                            <th>Shift</th>
                            <th>Day</th>
                            <th>Person</th>
                            <th></th>
                        </tr>
                    </thead>
 
                    <tbody>
                        <MealItem
                            v-for="item in schedule.items"
                            v-bind:key="item.meal.id"
                            v-bind:initialItem="item"
                            v-on:removeFromSchedule="removeFromSchedule" />
                    </tbody>
                </table>

                <p v-else>You don't have any meal in your schedule...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>{{ scheduleTotalLength }} items</strong>, {{ scheduleTotalPrice }} products

                <hr>

                <button class="button is-dark" @click="checkout()">Proceed to checkout</button>

                <!--router-link to="/schedule/checkout" class="button is-dark">Proceed to checkout</router-link-->
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import MealItem from '@/components/MealItem.vue'

export default {
    name: 'Schedule',
    components: {
        MealItem
    },
    data() {
        return {
            pantry: {
                type: "Pantry",
                items: [],
            },
            schedule: {
                user: 0,
                items: [],
            }
        }
    },
    mounted() {
        document.title = 'Schedule | Djackets'
        this.schedule = this.$store.state.schedule
        this.pantry = JSON.parse(JSON.stringify(this.$store.state.pantry))
    },
    methods: {
        removeFromSchedule(item) {
            this.schedule.items = this.schedule.items.filter(i => i.meal.id !== item.meal.id)
        },
        checkout() {
            // this.$store.state.schedule - this.$store.state.pantry = this.$store.state.cart

            for (let i = 0; i < this.schedule.items.length; i++) {
                const item = this.schedule.items[i]
                const products = item.meal.items
                for (let j = 0; j < products.length; j++) {
                    const ingredient = products[j]
                    const exists = this.pantry.items.filter(k => k.product.id === ingredient.product.id)
                    if (exists.length) {
                        console.log(exists[0])
                        const diff1 = (item.quantity * item.person.length * ingredient.quantity) - exists[0].quantity
                        if(diff1 > 0){
                            const item2 = {
                                product: ingredient.product,
                                quantity: diff1
                            }
                            this.$store.commit('addToCart', item2)
                            toast({
                                message: 'The product was added to the cart',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'bottom-right',
                            })
                            this.pantry.items = this.pantry.items.filter(l => l.product.id !== ingredient.product.id)
                        }else{
                            exists[0].quantity = exists[0].quantity - (item.quantity * item.person.length * ingredient.quantity)
                        }
                    } else {
                        const item2 = {
                            product: ingredient.product,
                            quantity: (item.quantity * item.person.length * ingredient.quantity)
                        }
                        this.$store.commit('addToCart', item2)
                    }
                }
            }

            this.$router.push('cart')
        }
    },
    computed: {
        scheduleTotalLength() {
            return this.schedule.items.reduce((acc, curVal) => {
                return acc += curVal.quantity * curVal.person.length
            }, 0)
        },
        scheduleTotalPrice() {
            return this.schedule.items.reduce((acc, curVal) => {
                return acc += curVal.quantity * curVal.person.length * curVal.meal.items.length
            }, 0)
        }
    }
}
</script>