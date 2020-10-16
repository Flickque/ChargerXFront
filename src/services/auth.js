import axios from 'axios';
const baseAddress = "http://localhost:4000"


let userInfo = {
    username: null,
    password: null
}

let AuthService = {
    authenticate: (username, password) => {
        return new Promise((resolve, reject) => {
            axios.post(baseAddress + '/login', {},
                {
                    auth: {
                        username: username,
                        password: password
                    }
                })
                .then(result => {
                    userInfo = {
                        username: username,
                        password: password
                    }
                    userInfo.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('user', JSON.stringify(userInfo));
                    resolve();
                })
                .catch(error =>
                    {
                        console.log(error);
                        reject();
                    }
                )
        });
    },
    getAxiosAuth: () => {
        return {
            auth: localStorage.getItem('user' )
        }
    },
    isAuth(){
        let user = localStorage.getItem('user' )
        if (user){
            return true
        }
        else{
            return false
        }
    },
    logout(){
        localStorage.removeItem('user');
        window.location.reload(true);
    }

}
AuthService.baseAddress = baseAddress
export default AuthService;