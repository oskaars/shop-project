import { createStore } from 'vuex'

import promotions from './promotions'
import promotion from './promotion'
import User from './User'

const modules = {
    promotions,
    promotion,
    User,

    // kolejne moduły

}

export default createStore({
    modules,
})