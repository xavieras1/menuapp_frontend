<template>
    <tr>
        <td><router-link :to="item.meal.get_absolute_url">{{ item.meal.name }}</router-link></td>
        <td>
            {{ item.quantity }}
            <a @click="decrementQuantity(item)">-</a>
            <a @click="incrementQuantity(item)">+</a>
        </td>
        <td>{{ item.shift }}</td>
        <td>{{ item.day }}</td>
        <td>{{ item.person }}</td>
        <td><button class="delete" @click="removeFromSchedule(item)"></button></td>
    </tr>
</template>

<script>
export default {
    name: 'MealItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity 
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if (item.quantity === 0) {
                this.$emit('removeFromSchedule', item)
            }
            this.updateSchedule()
        },
        incrementQuantity(item) {
            item.quantity += 1
            this.updateSchedule()
        },
        updateSchedule() {
            localStorage.setItem('schedule', JSON.stringify(this.$store.state.schedule))
        },
        removeFromSchedule(item) {
            this.$emit('removeFromSchedule', item)
            this.updateSchedule()
        },
    }
}
</script>