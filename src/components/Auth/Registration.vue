<template>
    <v-container class="containerPage" fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="formRegister" lazy-validation>
                            <v-text-field prepend-icon="mdi-account" name="email" label="Email" type="email" v-model="email" :rules="emailRules"></v-text-field>
                            <v-text-field prepend-icon="mdi-lock" name="password" label="Password" type="password" v-model="password" :rules="passwordRules"></v-text-field>
                            <v-text-field prepend-icon="mdi-lock-alert" name="confirm-password" label="Confirm password" type="password" v-model="confirmPassword" :rules="confirmPasswordRules"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="loginFormButton" color="primary" :loading="loading" @click="onSubmit" :disabled="!valid || loading">Registration</v-btn>
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
            confirmPassword: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be more than 8 characters',
            ],
            confirmPasswordRules: [
                v => !!v || 'Confirm password is required',
                v => v === this.password || 'passwords are not identical'
            ]
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        onSubmit() {
            if(this.$refs.formRegister.validate()) {
                const user = {
                    email: this.email,
                    password: this.password,
                }
                this.$store.dispatch('registerUser', user)
                .then(() => {
                    this.$router.push('/')
                })
                .catch(() => {})
            }
            
        },
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
            width: auto;
        }
    }
</style>