<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log in</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log in</button>
                        </div>
                    </div>

                    <hr>

                    <!--Or <router-link to="/sign-up">click here</router-link> to sign up! -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Log In | Menu A&A'
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            const formData = {
                username: this.username,
                password: this.password
            }
            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    
                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem("token", token)

                    this.getItemsList()
                    //this.getSchedule()

                    const toPath = this.$route.query.to || '/cart'
                    this.$router.push(toPath)
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
        },
        async getItemsList() {
            this.$store.commit('setIsLoading', true)
            await axios
                .get('/api/v1/itemslist/')
                .then(response => {
                    this.orders = response.data
                    const cart = this.orders.filter(i => i.type === "Cart")[0] 
                    const pantry = this.orders.filter(i => i.type === "Pantry")[0] 
                    cart.items = cart.items?cart.items:[]
                    pantry.items = pantry.items?cart.items:[]
                    console.log(cart)
                    this.$store.state.cart.items = cart.items
                    console.log(this.$store.state.cart)
                    console.log(pantry)
                    this.$store.state.pantry.items = pantry.items
                    console.log(this.$store.state.pantry)
                    localStorage.setItem('cart', JSON.stringify(cart))
                    localStorage.setItem('pantry', JSON.stringify(pantry))
                })
                .catch(error => {
                    console.log(error)
                })
            await axios
                .get('/api/v1/schedule/')
                .then(response => {
                    console.log(response)
                    console.log(response.data[0])
                    const schedule = response.data[0]
                    schedule.items = schedule.items?schedule.items:[]
                    console.log(schedule)
                    this.$store.state.schedule = schedule
                    localStorage.setItem('schedule', JSON.stringify(schedule))
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>