<template>
    <v-dialog 
        min-width="320"
        max-width="465"
        v-model="modal"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
            class="success buyButton"
            v-bind="attrs"
            v-on="on"
            >
                Buy
            </v-btn>
        </template>
        <v-card class="cardEdit">
           <v-container class="containerEdit">
                <v-layout row class="titleEdit">
                    <v-flex xs-12>
                        <v-card-title class="title">
                            <h1>Do you wan't to buy it?</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row class="textEdit">
                    <v-flex xs-12>
                        <v-text-field 
                            name="name" 
                            label="Name" 
                            type="text" 
                            v-model="name" 
                        >
                        </v-text-field>
                        <v-text-field 
                            name="phone" 
                            label="Your phone" 
                            type="text" 
                            v-model="phone"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row class="buttonEdit">
                    <v-flex xs-12>
                        <v-btn @click="onCansel" :disabled='localLoading' class="primary canselButton">Cancel</v-btn>
                        <v-btn @click="onSave" :disabled='localLoading' :loading='localLoading' class="success saveButton">Buy it</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['ad'],
    data() {
        return {
            modal: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onCansel() {
            this.modal = false
            this.name = ''
            this.phone = ''
        },
        onSave() {
            if(this.name != '' && this.phone != '') {
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId
                })
                .finally(() => {
                    this.name = '',
                    this.phone = '',
                    this.localLoading = false
                    this.modal = false
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .buyButton {
        margin-left: 10px;
    }
    .cardEdit {
        .containerEdit {
            padding: 25px;
            .titleEdit {
                .title {
                    margin-bottom: 5px;
                }
            }
            .textEdit {
                margin-top: 10px;
                margin-bottom: 20px;
            }
            .buttonEdit {
                margin-left: calc(100% - 180px);
                .saveButton {
                    margin-left: 10px;
                }
            }
        }
    }
</style>