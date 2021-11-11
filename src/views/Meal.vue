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

                <div class="control mt-6">
                    <div class="person-selector">
                        <input type="checkbox" id="angel" value="Angel" v-model="person" >
                        <label for="angel">Ang</label>
                        <input type="checkbox" id="annie" value="Annie" v-model="person">
                        <label for="annie">Ann</label>
                    </div>
                </div>

                <div class="control mt-6">
                    <div class="shift-selector">
                        <input type="radio" id="day" value="Día" v-model="shift" >
                        <label for="day">Día</label>
                        <input type="radio" id="night" value="Noche" v-model="shift">
                        <label for="night">Noc</label>
                    </div>
                </div>

                <div class="control mt-6">
                    <div class="weekDays-selector">
                        <input type="checkbox" id="monday" value="Monday" v-model="weekday" >
                        <label for="monday">M</label>
                        <input type="checkbox" id="tuesday" value="Tuesday" v-model="weekday">
                        <label for="tuesday">T</label>
                        <input type="checkbox" id="wednesday" value="Wednesday" v-model="weekday">
                        <label for="wednesday">W</label>
                        <input type="checkbox" id="thursday" value="Thursday" v-model="weekday">
                        <label for="thursday">T</label>
                        <input type="checkbox" id="friday" value="Friday" v-model="weekday">
                        <label for="friday">F</label>
                        <input type="checkbox" id="saturday" value="Saturday" v-model="weekday">
                        <label for="saturday">S</label>
                        <input type="checkbox" id="sunday" value="Sunday" v-model="weekday">
                        <label for="sunday">S</label>
                    </div>
                </div>

                <div class="control">
                    <input type="number" class="input" min="1" v-model="quantity">
                </div>
                
                <div class="control">
                    <a class="button is-dark" @click="addToSchedule()">Add to Schedule</a>
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
            quantity: 1,
            person: [],
            weekday: [],
            shift: ""
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
            if (!this.person.length) {
                this.person = ['Angel']
            }
            if (!this.weekday.length) {
                this.weekday = ['monday']
            }
            if (this.shift==="") {
                this.shift = 'Día'
            }
            for (const day in this.weekday) {
                const item = {
                    meal: this.meal,
                    quantity: this.quantity,
                    person: this.person,
                    day: this.weekday[day],
                    shift: this.shift
                }
                this.$store.commit('addToSchedule', item)
            }
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

<style lang="scss">
.weekDays-selector input, .person-selector input, .shift-selector input {
  display: none!important;
}

.weekDays-selector input[type=checkbox] + label, .person-selector input[type=checkbox] + label, .shift-selector input[type=radio] + label {
  display: inline-block;
  border-radius: 6px;
  background: #dddddd;
  height: 40px;
  width: 30px;
  margin-right: 3px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.weekDays-selector input[type=checkbox]:checked + label, .person-selector input[type=checkbox]:checked + label, .shift-selector input[type=radio]:checked + label {
  background: #48c78e;
  color: #ffffff;
}
</style>
