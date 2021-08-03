<template>
    <v-dialog 
        min-width="320"
        max-width="400"
        v-model="modal"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
            class="primary"
            v-bind="attrs"
            v-on="on"
            >
                Edit
            </v-btn>
        </template>
        <v-card class="cardEdit">
           <v-container class="containerEdit">
                <v-layout row class="titleEdit">
                    <v-flex xs-12>
                        <v-card-title class="title">
                            <h1>Edit ad</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row class="textEdit">
                    <v-flex xs-12>
                        <v-text-field 
                            name="title" 
                            label="Title" 
                            type="text" 
                            v-model="editedTitle" 
                        >
                        </v-text-field>
                        <v-textarea 
                            name="description" 
                            label="Description" 
                            type="text" 
                            v-model="editedDescription"
                        >
                        </v-textarea>
                    </v-flex>
                </v-layout>
                <v-layout row class="buttonEdit">
                    <v-flex xs-12>
                        <v-btn @click="onCansel" class="primary canselButton">Cancel</v-btn>
                        <v-btn @click="onSave" class="success saveButton">Save</v-btn>
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
            editedTitle: this.ad.title,
            editedDescription: this.ad.description
        }
    },
    methods: {
        onCansel() {
            this.modal = false
            this.editedDescription = this.ad.description
            this.editedTitle = this.title
        },
        onSave() {
            if(this.editedTitle != '' && this.editedDescription != '') {
                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.ad.id
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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
                margin-left: calc(100% - 170px);
                .saveButton {
                    margin-left: 10px;
                }
            }
        }
    }
</style>