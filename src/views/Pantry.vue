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
                            <th></th>
                        </tr>
                    </thead>
 
                    <tbody>
                        <ListItem
                            v-for="item in pantry.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromList="removeFromPantry"
                            v-on:updateList="updatePantry" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your pantry...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>{{ pantryTotalLength }} items</strong>, 

                <hr>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ListItem from '@/components/ListItem.vue'

export default {
    name: 'Pantry',
    components: {
        ListItem
    },
    data() {
        return {
            pantry: {
                items: []
            }
        }
    },
    mounted() {
        document.title = 'Pantry | Djackets'
        this.pantry = this.$store.state.pantry
    },
    methods: {
        removeFromPantry(item) {
            this.pantry.items = this.pantry.items.filter(i => i.product.id !== item.product.id)
        },
        updatePantry() {
            localStorage.setItem('pantry', JSON.stringify(this.$store.state.pantry))
        }
    },
    computed: {
        pantryTotalLength() {
            return this.pantry.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>