import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from './Components/ProtectedRoute';
import axios from 'axios';
import AuthService from './services/auth';
import Auth from "./services/auth";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import MainPanel from "./Components/MainPanel";
import ChargersPanel from "./Components/ChargersPanel";
import PurchasesPanel from "./Components/PurchasesPanel";
import ProfilePanel from "./Components/ProfilePanel";
import Signup from "./Pages/SignUp";




class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            isAuthenticated: AuthService.isAuth(),
            isToggled: false,
            chargers: [],
            purchase: {
                id: "",
                time_amount: "",
                startTime: "",
                endTime: "",
            },
            activePurchase:false,
            error: {
                status: false,
                body: {}
            },
            user_purchases:[],
            map:{
                zoom: 8,
                lat:65.059274,
                lng:25.455584
            }
        };
        this.handleSideBarToggled = this.handleSideBarToggled.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.getPurchases = this.getPurchases.bind(this)
        this.getUser = this.getUser.bind(this)
        this.getMapCenterData = this.getMapCenterData.bind(this)
    }

    onLogin = () => {
        this.setState({ isAuthenticated: AuthService.isAuth() })
    }

    onLoginFail = () => {
        this.setState({ isAuthenticated: false });
    }

    getAuth(){
        let auth = {}
        if (JSON.parse(AuthService.getAxiosAuth().auth)) {
            auth = {
                auth: {
                    password: JSON.parse(AuthService.getAxiosAuth().auth).password,
                    username: JSON.parse(AuthService.getAxiosAuth().auth).username
                }
            }
        }
        return auth
    }

    handleSideBarToggled() {
        this.setState(state => ({
            isToggled: !state.isToggled
        }));
    }

    errorHandler(){
        this.setState({ error: {
                status: false,
                body: {}
            }});
    }

    getChargers(){
        axios.get(Auth.baseAddress + '/chargers').then(results => {
            this.setState({ chargers: results.data });
        })
    }




    getUser(){
        axios.get(Auth.baseAddress + '/user', this.getAuth()).then(results => {
            this.setState({ user: results.data[0] });
        })
    }



    startCharging = (purchase) =>{

        this.setState({purchase: purchase}, () => {
            axios.post(AuthService.baseAddress + '/start-charge', this.state.purchase, this.getAuth())
                .then(results => {
                    this.setState({activePurchase: true})
                }).catch(error =>
                {
                    this.setState({activePurchase: false})
                    this.setState({ error: {
                            status: true,
                            body: error
                        }});

                }
            )
        })
    }

    stopCharging = (purchase) =>{

        this.setState({purchase: purchase}, () => {
            axios.post(AuthService.baseAddress + '/stop-charge', this.state.purchase, this.getAuth())
                .then(results => {
                    this.setState({activePurchase: false})
                }).catch(error =>
                {
                    this.setState({ error: {
                            status: true,
                            body: error
                        }});

                }
            )
        })
    }

    getPurchases(){
        axios.get(Auth.baseAddress + '/purchases-protected', this.getAuth()).then(results => {
            this.setState({ user_purchases: results.data });
        })
    }

    getActiveChargers(){
        axios.get(Auth.baseAddress + '/active-chargers', this.getAuth()).then(results => {
            if (results.data.length > 0) {
                this.setState({
                    purchase: {
                        id: results.data[0].charger_id,
                        time_amount: this.state.purchase.time_amount,
                        startTime: results.data[0].date_start,
                        endTime: this.state.purchase.endTime,
                    }
                })
                this.setState({activePurchase: true})
            }
        })
    }

    getMapCenterData(){
        const url = new URL(window.location.href);
        let lat = url.searchParams.get('lat')
        let lng = url.searchParams.get('lng')

        if (lat && lng) {
            this.setState({
                map:{
                    zoom: 15,
                    lat: lat,
                    lng: lng
                }
            })
        }
    }

    componentDidMount() {
        this.getChargers()
        this.getPurchases()
        this.getActiveChargers()
        this.getUser()
        this.getMapCenterData()
    }


    render(){
        return (
            <React.Fragment>
                <Router>
                    <div className="App">
                        <Header isToggled={this.state.isToggled} getMapCenterData={this.getMapCenterData} handle={this.handleSideBarToggled}/>
                        <div id="page-content">
                            <Sidebar isAuthenticated={this.state.isAuthenticated} isToggled={this.state.isToggled}/>
                            <Switch>
                                <div className="Mainpanelwrap">
                                    <Route exact path={'/'}>
                                        <MainPanel
                                            isAuthenticated = {this.state.isAuthenticated}
                                            purchase={this.state.purchase}
                                            active={this.state.activePurchase}
                                            start={this.startCharging}
                                            stop={this.stopCharging}
                                            chargers={this.state.chargers}
                                            map={this.state.map}
                                        />
                                    </Route>
                                    <Route path={`/chargers`}>
                                        <ChargersPanel
                                            isAuthenticated = {this.state.isAuthenticated}
                                            error={this.state.error}
                                            errorHandler={this.errorHandler}
                                            purchase={this.state.purchase}
                                            active={this.state.activePurchase}
                                            start={this.startCharging}
                                            stop={this.stopCharging}
                                            chargers={this.state.chargers}/>
                                    </Route>
                                    <Route path="/login" component={
                                        (routeProps) =>
                                            <Login
                                                isAuthenticated = {this.state.isAuthenticated}
                                                loginSuccess = { this.onLogin }
                                                loginFail = { this.onLoginFail }
                                                userInfo={ this.state.userInfo }
                                                redirectPathOnSuccess="/profile"
                                                {...routeProps}
                                            />
                                    }>
                                    </Route>
                                    <Route path="/signup">
                                        <Signup/>
                                    </Route>
                                    <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/purchases" exact>
                                        <PurchasesPanel
                                            getPurchases={this.getPurchases}
                                            purchases={this.state.user_purchases}
                                            getAuth={this.getAuth}
                                        />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/profile" exact>
                                        <ProfilePanel
                                            getUser={this.getUser}
                                            user={this.state.user}
                                        />
                                    </ProtectedRoute>

                                </div>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
