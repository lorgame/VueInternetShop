<template>
  <!--Оболонка-->
  <v-app >
    <!--Випадаюче меню навігації-->
    <v-navigation-drawer 
    app
    temporary
    v-model="drawer"
    >
      <v-list dense class="navbarContainer">
        <v-subheader class="navbarHeaderContainer">
          <router-link tag="h3" class="navbarNamed" to="/" title="Portfolio AD application - №1">AD application</router-link> 
          <v-spacer></v-spacer>
          <v-btn class="navbarIconClose" color="white" icon @click="drawer = !drawer">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-subheader>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, icon) in items"
            :key="icon"
            :to="item.url"
          >
           <v-list-item-icon class="navbarIconContainer">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="navbarItemContainer">
              <v-list-item-title class="navbarItemTitle" v-text="item.title"></v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
          <v-list-item
            v-if="this.isUserLoggedIn"
            @click="onLogout"
            to="/login"
          >
           <v-list-item-icon class="navbarIconContainer">
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="navbarItemContainer">
              <v-list-item-title class="navbarItemTitle" v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  
    <!--хедер-->
    <v-app-bar
      color="primary"
      dense
      absolute
      dark
      height="64px"
    >
      <v-app-bar-nav-icon class="navbarIconOpen d-md-none d-sm-flex" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><router-link class="headerTitle" tag="h4" title="Portfolio AD application - №1" to="/">AD application</router-link></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn-toggle
        class="navbarBtnContainer d-none  d-md-flex"
         group
      >
        <v-btn 
          class="navbarBtnItem"
          v-for="(item, icon) in items"
          :key="icon"
          :to="item.url"
        >
          <v-icon medium left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn 
          v-if="this.isUserLoggedIn"
          class="navbarBtnItem"
          @click="onLogout"
          to="/login"
        >
          <v-icon medium left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-btn-toggle>
    </v-app-bar>

    <!--маін-->
    <v-main>
      <div class="block"></div>
      <router-view></router-view>
    </v-main>

  <div class="text-center ma-2">
    <v-snackbar
      v-if="error != null ? this.snackbar = true : this.shackbar = false"
      v-model="snackbar"
    >
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="closeSnackbarOptions"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        selectedItem: false,
        snackbar: false,
        liveCikle: false
      }
    },
    computed: {
      error() {
        return this.$store.getters.error
      },
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },
      items() {
        if(this.isUserLoggedIn) {
          return [
            {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
            {title: 'New ad', icon: 'mdi-file-plus-outline', url: '/new'},
            {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list'},
          ]
        }
        else {
          return [
            {title: 'Login', icon: 'mdi-lock', url: '/login'},
            {title: 'Registration', icon: 'mdi-face', url: '/registration'}
          ]
        }

      },
    },
    methods: {
      closeSnackbarOptions() {
        this.$store.dispatch('clearError')
        this.snackbar = false
      },
      onLogout() {
        this.$store.dispatch('logoutUser')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .navbarContainer {
    padding-top: 0;
  }
  .navbarHeaderContainer {
    height: 48px !important;
    padding-top: 8px !important;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
    background: rgb(25, 118, 210);
  }
  .navbarNamed {
    font-size: 20px;
    color: white;
    cursor: pointer;
  }
  .navbarItemContainer {
    padding: 0 !important;
    height: 40px !important;
  }
  .navbarItemTitle {
    height: inherit;
    display: flex;
    align-items: center;
    font-size: 16px !important;
  }
  .navbarIconContainer {
    margin-right: 12px !important;
  }
  .navbarBtnContainer {
    height: inherit;
  }
  .navbarBtnItem {
    height: inherit !important;
    margin: 0 4px!important;
    opacity: 1 !important;
    border: 0px !important;
  }
  .headerTitle {
    cursor: pointer;
  }
  .block {
    height: 64px;
  }
</style>
<style lang="scss">
  .containerLoader {
    height: calc(100% - 64px);
    display: flex;
    align-items: center;
    .loadingCenter {
        display: flex;
        justify-content: center;
    }
  }
</style>