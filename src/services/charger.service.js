import axios from "axios";
import AuthService from "./auth";

let chargers = {}



let ChargerService = {
    fetchChargers: () => {
        return new Promise( (resolve, reject) => {
            axios.get(AuthService.baseAddress + '/chargers').then(results => {
                chargers = results.data
                resolve()
            }).catch(error =>
                {
                    console.log(error);
                    reject();
                }
            )
        })
    },
    getChargers: () =>{
        return {
            chargers: chargers
        }
    }
}


export default ChargerService;