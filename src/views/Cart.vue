<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Cart</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
 
                    <tbody>
                        <ListItem
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromList="removeFromCart"
                            v-on:updateList="updateCart" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>{{ cartTotalLength }} items</strong>

                <hr>

                <!--router-link to="/cart/checkout" class="button is-dark">Proceed to checkout</router-link-->
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ListItem from '@/components/ListItem.vue'

export default {
    name: 'Cart',
    components: {
        ListItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.type = 'Cart'
        document.title = this.type + ' | Djackets'
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>