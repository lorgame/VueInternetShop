import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC-QLEH_XQuCFtt0r2H7TfrT59JamZaOlI',
      authDomain: 'ad-project-30701.firebaseapp.com',
      databaseURL: 'https://ad-project-30701-default-rtdb.firebaseio.com',
      projectId: 'ad-project-30701',
      storageBucket: 'ad-project-30701.appspot.com',
      messagingSenderId: '521666928618',
      appId: '1:521666928618:web:186cc71b94d90a1a64dc93',
      measurementId: 'G-VE83SEQNDC'
    })

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')


