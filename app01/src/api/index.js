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



const getPromotions = () => get("http://localhost:3000/promotions")


export {

    getPromotions,
    //tu będą pozostałe metody
}