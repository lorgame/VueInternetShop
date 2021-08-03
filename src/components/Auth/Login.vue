<template>
    <v-container class="containerPage" fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="formLogin" validate>
                            <v-text-field prepend-icon="mdi-account" name="email" label="Email" type="email" v-model="email" :rules="emailRules"></v-text-field>
                            <v-text-field prepend-icon="mdi-lock" name="password" label="Password" type="password" v-model="password" :rules="passwordRules"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="loginFormButton" color="primary" :loading="loading" @click="onSubmit" :disabled="!valid || loading">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            valid: true,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be more than 8 characters',
            ],
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        onSubmit() {
            if(this.$refs.formLogin.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('loginUser', user)
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch(() => {})
            }
            else {
                valid: false
            }
        },
    },
    created() {
        if(this.$route.query['loginError=true']) {
            this.$store.dispatch('setError', 'Please log in to access this page')
        }
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
        height: calc(100% - 64px);
        .loginFormButton {
            width: 100px;
        }
    }
</style>