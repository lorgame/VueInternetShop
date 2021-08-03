<template>
    <v-container class="containerPage" v-if="loading">
        <v-layout>
            <div class="containerLoader">
                <v-container>
                    <v-layout row>
                        <v-flex xs-12 class="loadingCenter">
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-layout>
    </v-container>
    <v-container v-else-if="orders.length !== 0 && !loading">
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Orders</h1>
                <v-list
                    class="listOrderContainer"
                    subheader
                    two-line
                    flat
                >
                <div
                    v-for="order in orders"
                    :key="order.id"
                >
                    <v-list-item class="listItem">
                        <v-checkbox
                            :disabled='order.done'
                            :input-value="order.done"
                            @change="markDone(order)"
                            class="listitemCheckbox"
                        >
                        </v-checkbox>
                        <v-list-item-content>
                            <v-list-item-title>{{order.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                        </v-list-item-content>
                            <v-btn 
                                class="primary"
                                :to="'/ad/' + order.adId"
                            >
                               Open
                            </v-btn>
                        </v-list-item>
                    </div>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container> 
    <v-container v-else>
        <v-layout>
            <v-flex xs-12>
                <h1>You don`t have orders</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    computed: {
        orders() {
            return this.$store.getters.orders
        },
        loading() {
            return this.$store.getters.loading
        },
    },
    methods: {
        markDone(order) {
            this.$store.dispatch('markOrderDone', order.id)
            .then(() => {
                order.done = true
                console.log(order.done)
            })
            .catch(() => {})
        }
    },
    beforeCreate() {
    //   if(!this.$store.state.orders.orders.length) this.$store.dispatch('fetchOrders')
        this.$store.dispatch('fetchOrders')
    }
}
</script>
<style lang="scss" scoped>
    @media (min-width: 1904px) {
        .containerPage {
            width: 1165px;
            margin-left: calc(50% - 1141px / 2);
        }
    }
    .listOrderContainer {
        background: rgb(237, 236, 255);
        padding-bottom: 0;
        .listItem {
            border: 1px solid rgb(174, 173, 255);
            margin-top: -1px;
            .listitemCheckbox {
                margin-right: 10px;
            }
        }
    }
    
    
</style>