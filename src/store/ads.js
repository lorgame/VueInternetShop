import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

class Ad {
    constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: [],
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        },
        loadAds(state, payload) {
            state.ads = payload
        },
        updateAd (state, {title, description, id}) {
            const ad = state.ads.find(a => {
                return a.id === id
            })
            ad.title = title
            ad.description = description
        }
    },
    actions: {
        async createAd ({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.image

            try {
                const newAd = new Ad(
                    payload.title, 
                    payload.description, 
                    firebase.auth().currentUser.uid,
                    '',
                    payload.promo
                )
                const ad = await firebase.database().ref('ads').push(newAd)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await firebase.storage().ref(`ads/${ad.key}${imageExt}`).put(image)
                const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

                await firebase.database().ref('ads').child(ad.key).update({
                    imageSrc
                })
                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc
                })
                
            }
            catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchAds ({commit}) {
            commit('clearError')
            commit('setLoading', true)
            
            const resultAds = []

            try {
                const firebaseValue = await firebase.database().ref('ads').once('value')
                const ads = firebaseValue.val() 

                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    resultAds.push(
                        new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
                    )
                })
                commit('loadAds', resultAds)
                commit('setLoading', false)
            }
            catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updateAd ({commit}, {title, description, id}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await firebase.database().ref('ads').child(id).update({
                    title, description
                })
                commit('updateAd', {
                    title, description, id
                })
                commit('setLoading', false)
            }
            catch {
                commit('setError', error.message)
                commit('setLoading', false)
            }
        }
        
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds(state, getters) {
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        },
    }
}