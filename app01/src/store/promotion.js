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
        }
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {

        FETCH_PROMOTION({ state, commit }) {

            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

            commit("SET_PROMOTIONS_LOADING", true)

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading

            getPromotionItems()
                .then(data => {
                    commit("SET_PROMOTIONS_OBJECT", data)
                })
                .catch(error => {
                    commit("SET_PROMOTIONS_ERROR", "server error!!!")
                })
                .finally(() => {
                    commit("SET_PROMOTIONS_LOADING", false)
                })
        },
    }
}



export default promotion
