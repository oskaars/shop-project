import axios from "axios"

const get = async (url) => {
    try {

        const delay = 500 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        const response = await axios.get(url);
        console.log("data", response.data);
        return response.data; // Zwracamy dane (to samo co resolve)
    } catch (error) {
        throw error;
    }
};

const post = (url, userObject) => new Promise((resolve, reject) => {

    setTimeout(() => {
        axios.post(url, userObject, { withCredentials: true }) // nagłówek obsługiwany na serwerze
            .then(response => {
                console.log("data", response.data);
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })

    }, 1000);

})



const getPromotions = () => get("http://localhost:3000/promotions")
const getPromotion = (id) => get(`http://localhost:3000/promotion/${id}`)
const getProduct = (id) => get(`http://localhost:3000/product/${id}`)
const getPromotionItems = (id) => get(`http://localhost:3000/promotionItems/${id}`)

const registerUser = (userObject) => post(`http://localhost:3000/createUser`, userObject);
const loginUser = (userObject) => post(`http://localhost:3000/loginUser`, userObject);
const logoutUser = () => post(`http://localhost:3000/logoutUser`);
const getCurrentUser = () => get(`http://localhost:3000/getCurrentUser`);

export {

    getPromotions,
    getPromotion,
    getProduct,
    getPromotionItems,
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
       //tu będą pozostałe metody
}