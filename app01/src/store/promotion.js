import { getPromotionItems, getProduct } from "@/api"


const promotion = {
    state() {
        return {
            promotionObject: {},
            promotionLoading: false,
            promotionError: null
        }

    },
    //mutations czyli setters
    mutations: {
        SET_PROMOTION_OBJECT(state, newPromotionObject) {
            console.log("działa")
            state.promotionObject = newPromotionObject
        },
        SET_PROMOTION_LOADING(state, loadingState) {
            state.promotionLoading = loadingState
        },
        SET_PROMOTION_ERROR(state, error) {
            state.promotionError = error
        }
    },

    //getters
    getters: {
        GET_PROMOTION_OBJECT(state) {
            return state.promotionObject
        },
        GET_PROMOTION_LOADING(state) {
            return state.promotionLoading
        },
        GET_PROMOTION_ERROR(state) {
            return state.promotionError
        }
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
// store/promotion.js

FETCH_PROMOTION({ commit }, id) {
    commit("SET_PROMOTION_LOADING", true);

    getPromotionItems(id)
        .then(data => {
            // data jest teraz tablicą [ {...}, {...} ]
            // Zapisujemy ją jako obiekt z kluczem items, 
            // bo tak masz ustawione w PromotionView.vue (promotionObject.items)
            commit("SET_PROMOTION_OBJECT", { items: data });
        })
        .catch(error => {
            console.error("Błąd pobierania:", error);
            commit("SET_PROMOTION_ERROR", "Nie udało się pobrać produktów.");
        })
        .finally(() => {
            commit("SET_PROMOTION_LOADING", false);
        });
}
    }
}



export default promotion
