import { loginUser, logoutUser, getCurrentUser } from '@/api';


const User = {
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
        async LOGIN_USER({ commit }, userData) {
            commit('SET_CURRENT_LOADING', true);
            try {
                const response = await loginUser(userData);
                if (response.status === 'logged') {
                    // Pobierz dane aktualnego użytkownika
                    const userResponse = await getCurrentUser();
                    if (userResponse.status === 'authorized') {
                        commit('SET_CURRENT_USER', { email: userResponse.email });
                    }
                }
                return response;
            } catch (error) {
                throw error;
            } finally {
                commit('SET_CURRENT_LOADING', false);
            }
        },
        async LOGOUT_USER({ commit }) {
            commit('SET_CURRENT_LOADING', true);
            try {
                const response = await logoutUser();
                if (response.status === 'logout') {
                    commit('SET_CURRENT_USER', null);
                }
                return response;
            } catch (error) {
                throw error;
            } finally {
                commit('SET_CURRENT_LOADING', false);
            }
        },
        async FETCH_CURRENT_USER({ commit }) {
            commit('SET_CURRENT_LOADING', true);
            try {
                const response = await getCurrentUser();
                if (response.status === 'authorized') {
                    commit('SET_CURRENT_USER', { email: response.email });
                } else {
                    commit('SET_CURRENT_USER', null);
                }
            } catch (error) {
                commit('SET_CURRENT_USER', null);
            } finally {
                commit('SET_CURRENT_LOADING', false);
            }
        }
    }

}

export default User