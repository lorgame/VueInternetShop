<template>
    <div class="containerPage" v-if="!loading">
        <v-container>
            <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
            >
                <v-carousel-item
                v-for="ad in promoAds"
                :key="ad.id"
                :src="ad.imageSrc"
                class="caruselItem"
                :to="'/ad/' + ad.id"
                >
                <div class="caruselBlackLine"></div>
                <div class="caruselItemTitle">
                    {{ad.title}}
                </div>
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                xs12
                sm6
                md4
                v-for="ad of ads"
                :key="ad.id"
                >
                    <v-card
                        class="mx-auto"
                        max-width="344"
                    >
                        <v-img
                            :src="ad.imageSrc"
                            height="200px"
                        ></v-img>

                        <v-card-title>
                            {{ad.title}}
                        </v-card-title>

                         <v-card-text class="text--primary">
                            <pre class="cardTextPre">
 {{ad.description}}

                            </pre>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="primary"
                                text
                                :to="'/ad/' + ad.id"
                            >
                                Open
                            </v-btn>
                            <app-buy-modal :ad="ad"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
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
    </div>
</template>
<script>
import BuyModal from './Shared/BuyModal'

export default {
    computed: {
        promoAds() {
            return this.$store.getters.promoAds
        },
        ads() {
            return this.$store.getters.ads
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    components: {
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
    .caruselItem {
        cursor: pointer;
    }
    .caruselBlackLine {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
        background: rgba($color: #000000, $alpha: 0.5);
    }
    .caruselItemTitle {
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        width: fit-content;
        border-left: 30px solid rgba($color: #000000, $alpha: 0.0);
        border-right: 30px solid rgba($color: #000000, $alpha: 0.0);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: rgba($color: #000000, $alpha: 0.5);
        color: white;
        font-size: 40px;
    }
    .cardTextPre {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -moz-box;
        -moz-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-clamp: 3;
        box-orient: vertical;
    }
    .containerLoader {
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
    }
</style>