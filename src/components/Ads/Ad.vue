<template>
    <v-container v-if="loading">
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
    <v-container v-else class="mt-5 containerPage">
        <v-layout row >
            <v-flex xs12>
                <v-card>
                    <div class="adImage" :style="{ 'background-image': 'url(' + ad.imageSrc + ')' }"></div>
                    <v-card-text>
                        <h1 class="text--primary mb-5">{{ad.title}}</h1>
                        <pre>{{ad.description}}</pre>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <ad-edit-modal :ad='ad' v-if="isOwner"></ad-edit-modal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import EditAdModal from './EditAdModal'
import BuyModal from '../Shared/BuyModal'

export default {
    props: ['id'],
    computed: {
        ad() {
            const id = this.id
            return this.$store.getters.adById(id)
        },
        loading() {
            return this.$store.getters.loading
        },
        isOwner() {
            return this.ad.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        adEditModal: EditAdModal,
        appBuyModal: BuyModal
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
    .containerPage {
        .adImage {
            display: block !important;
            width: 100%;
            height: 300px;
            background-size: contain;
            background-position: center center;
        }
    }
</style>