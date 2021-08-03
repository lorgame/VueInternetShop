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
    <v-container v-else-if="!loading && myAds.length !== 0" class="containerPage">
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">My ads</h1>
                <v-card
                    elevation="10" 
                    class="mb-5"
                    v-for="ad in myAds"
                    :key="ad.id"
                >
                    <v-layout>
                        <v-flex xs4>
                            <div class="adItemImg" :style="{ 'background-image': 'url(' + ad.imageSrc + ')' }"></div>
                        </v-flex>
                        <v-flex xs8 class="containerAdItemInfo">
                            <div class="adItemInfo">
                                <h2 class="text--primary">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </div>
                            <v-btn 
                                class="primary adItemBtn"
                                :to="'/ad/'+ ad.id"
                            >
                                Open
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container class="containerPage" fluid fill-height v-else>
        <v-layout align-center justify-center>
            <v-flex xs-12>
                <h1 class="message">You dont have ads</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    computed: {
        myAds() {
            return this.$store.getters.myAds
        },
        loading() {
            return this.$store.getters.loading
        }
    },
}
</script>
<style lang="scss" scoped>
    @media (min-width: 1904px) {
        .containerPage {
            width: 1165px;
            margin-left: calc(50% - 1141px / 2);
        }
    }
    .adItemImg {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
    .containerAdItemInfo {
        padding: 20px;
        .adItemBtn {
            width: 100px;
            margin-left: calc(100% - 100px);
        }
    }
    .containerPage {
        height: calc(100% - 64px);
        .message {
            text-align: center;
        }
    }
</style>