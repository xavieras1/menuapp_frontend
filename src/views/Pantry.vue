<template>
    <div class="page-pantry">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Pantry</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="pantryTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
 
                    <tbody>
                        <CartItem
                            v-for="item in pantry.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromPantry" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your pantry...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>${{ pantryTotalPrice.toFixed(2) }}</strong>, {{ pantryTotalLength }} items

                <hr>

                <router-link to="/pantry/checkout" class="button is-dark">Proceed to checkout</router-link>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'

export default {
    name: 'Pantry',
    components: {
        CartItem
    },
    data() {
        return {
            pantry: {
                items: []
            }
        }
    },
    mounted() {
        this.pantry = this.$store.state.pantry
    },
    methods: {
        removeFromPantry(item) {
            this.pantry.items = this.pantry.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        pantryTotalLength() {
            return this.pantry.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        pantryTotalPrice() {
            return this.pantry.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>