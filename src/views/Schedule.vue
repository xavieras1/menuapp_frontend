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
                            v-on:removeFromCart="removeFromSchedule" />
                    </tbody>
                </table>

                <p v-else>You don't have any meal in your schedule...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>${{ scheduleTotalPrice.toFixed(2) }}</strong>, {{ scheduleTotalLength }} items

                <hr>

                <router-link to="/schedule/checkout" class="button is-dark">Proceed to checkout</router-link>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import MealItem from '@/components/MealItem.vue'

export default {
    name: 'Schedule',
    components: {
        MealItem
    },
    data() {
        return {
            schedule: {
                items: []
            }
        }
    },
    mounted() {
        this.schedule = this.$store.state.schedule
    },
    methods: {
        removeFromSchedule(item) {
            this.schedule.items = this.schedule.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        scheduleTotalLength() {
            return this.schedule.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        scheduleTotalPrice() {
            return this.schedule.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>