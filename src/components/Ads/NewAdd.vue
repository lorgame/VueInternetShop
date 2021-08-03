<template>
    <v-container class="containerPage">
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary">Create new ad</h1>
                <v-form v-model="valid" ref="formCreateAd" validate>
                    <v-text-field required name="title" label="Ad title" type="text" v-model="title" :rules="titleRules"></v-text-field>
                    <v-textarea required name="description" label="Ad description" type="text" v-model="description" :rules="descriptionRules"></v-textarea>
                </v-form>
                <v-layout class="mb-5">
                    <v-flex xs12>
                        <v-btn 
                            color="primary" 
                            @click="trigerLoadImage" 
                        >
                            <v-icon left dark>mdi-cloud-upload</v-icon>
                            Load image
                        </v-btn>
                        <input @change="onFileChange" ref="fileInput" type="file" style="display: none;" accept="image/*">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <div v-if="imageSrc" class="imageUpload" :style="{'background-image': 'url(' + imageSrc + ')'}"></div>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch label="Add to Promo?" v-model="promo"></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-btn 
                            color="primary" 
                            @click="createAd" 
                            :loading="loading"
                            :disabled="!valid || !image || loading">
                            Create ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            promo:'',
            valid: '',
            title: '',
            description: '',
            titleRules: [
                v => !!v || 'Title is required'
            ],
            descriptionRules: [
                v => !!v || 'Description is required'
            ],
            imageSrc: '',
            image: null
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        createAd() {
            if(this.$refs.formCreateAd.validate() && this.image) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                }
                this.$store.dispatch('createAd', ad)
                .then(() => {
                    this.$router.push('/list')
                })
                .catch(() => {})
            }
        },
        trigerLoadImage() {
            this.$refs.fileInput.click()
        },
        onFileChange(event) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = e => {
                this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file
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
    .imageUpload {
        margin-top: 30px;
        height: 210px;
        width: 100%;
        background-size: contain;
        background-position: center;
    }
</style>