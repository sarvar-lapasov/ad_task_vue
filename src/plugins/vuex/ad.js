import deleteRequest from "@/plugins/requests/deleteRequest";
import getRequest from "@/plugins/requests/getRequest";
import getRequests from "@/plugins/requests/getRequests";
import postRequest from "@/plugins/requests/postRequest";
import putRequest from "@/plugins/requests/putRequest";

export default {
    actions: {
        fetchAds(context, data) {
            return getRequests('/ads', data, 'updateAds', context)
        },
        fetchAd(context, adtId) {
            return getRequest('/ads', adtId, 'updateAd', context);
        },
        deleteAd(context, adtId) {
            return deleteRequest('/ads', adtId)
        },
        pushAd(context, data) {
            return postRequest('/ads', data);
        },
        pushAdPhoto(context, { id, data }) {
            return postRequest(`/ads/${id}/photos`, data);
        },
        editAd(context, { id, data }) {
            return putRequest('/ads/' + id, data)
        },
    },

    mutations: {
        updateAds(state, ads) {
            state.ads = ads;
        },
        updateAd(state, ad) {
            state.ad = ad;
        },

    },
    state: {
        ads: {
            models: [],
            totalItems: 0,
        },
        ad: '',


    },
    getters: {
        getAds(state) {
            return state.ads.models;
        },
        getAd(state) {
            return state.ad;
        },
        getAdTotal(state) {
            return state.ads.totalItems;
        },
    },
};