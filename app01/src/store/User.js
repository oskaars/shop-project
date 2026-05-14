import { loginUser, logoutUser, getCurrentUser } from '@/api';


const User = {
    namespaced: true,
    state: {
        userObject: null,
        userLoading: false,
    },
    mutations: {
        SET_CURRENT_USER(state, userObject) {
            state.userObject = userObject;
        },
        SET_CURRENT_LOADING(state, userLoading) {
            state.userLoading = userLoading
        }
    },
    getters: {
        GET_CURRENT_USER(state) {
            return state.userObject;
        },
        GET_CURRENT_LOADING(state){
            return state.userLoading
        }
    },
    actions:{
        LOGIN_USER({ commit }, { email, password }) {
            commit('SET_CURRENT_LOADING', true);

            return loginUser({ email, password })
                .then((userObject) => {
                    if (userObject.email) {
                        commit('SET_CURRENT_USER', userObject);
                    }
                })
                .finally(() => {
                    commit('SET_CURRENT_LOADING', false);
                });
        },
        LOGOUT_USER({ commit }) {
            commit('SET_CURRENT_USER', null);
            return logoutUser();
        },
        FETCH_CURRENT_USER({ commit, getters }) {
            if (getters.GET_CURRENT_USER) {
                return Promise.resolve();
            }

            commit('SET_CURRENT_LOADING', true);

            return getCurrentUser()
                .then((userObject) => {
                    if (userObject.email) {
                        commit('SET_CURRENT_USER', userObject);
                    }
                })
                .finally(() => {
                    commit('SET_CURRENT_LOADING', false);
                });
        }
    }

}

export default User
