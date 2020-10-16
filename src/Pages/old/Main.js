import React, {Component} from 'react';
import PropTypes from "prop-types";
import styles from "./Main.module.css"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    withRouter
} from "react-router-dom";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import MainPanel from "../Components/MainPanel";
import ChargersPanel from "../Components/ChargersPanel";
import PurchasesPanel from "../Components/PurchasesPanel";
import ProfilePanel from "../Components/ProfilePanel";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import axios from "axios";
import AuthService from "../services/auth";
import Auth from "../services/auth";

const Location = () => {
    let { path, url } = useRouteMatch();
    return path
}

class ShowTheLocation extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    render() {
        const { match, location, history } = this.props;
        return <div>You are now at {location.pathname}</div>;
    }
}

const ShowTheLocationWithRouter = withRouter(ShowTheLocation);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            user_purchases:[]

        };
        this.handleSideBarToggled = this.handleSideBarToggled.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
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

    getProtectedTest(){
        let auth = {
            auth: {
                password: JSON.parse(AuthService.getAxiosAuth().auth).password,
                username: JSON.parse(AuthService.getAxiosAuth().auth).username
            }
        }
        axios.get(Auth.baseAddress + '/hello-protected', auth).then(results => {
            console.log(results.data)
        })
    }



    startCharging = (purchase) =>{

        let purchaseArray = {
            id: purchase.id,
            time_amount: purchase.time_amount,
            startTime: purchase.startTime,
            endTime: purchase.endTime,
        }
        let auth = {
            auth: {
                password: JSON.parse(AuthService.getAxiosAuth().auth).password,
                username: JSON.parse(AuthService.getAxiosAuth().auth).username
            }
        }
        this.setState({purchase: purchaseArray}, () => {
            axios.post(AuthService.baseAddress + '/start-charge', this.state.purchase, auth)
            .then(results => {
                console.log('good', results);
                this.setState({activePurchase: true})
            }).catch(error =>
                {
                    console.log('error', error);
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

        let purchaseArray = {
            id: purchase.id,
            time_amount: purchase.time_amount,
            startTime: purchase.startTime,
            endTime: purchase.endTime,
        }
        console.log(purchaseArray)
        let auth = {
            auth: {
                password: JSON.parse(AuthService.getAxiosAuth().auth).password,
                username: JSON.parse(AuthService.getAxiosAuth().auth).username
            }
        }
        this.setState({purchase: purchaseArray}, () => {
            axios.post(AuthService.baseAddress + '/stop-charge', this.state.purchase, auth)
                .then(results => {
                    console.log('good', results);
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
        let auth = {
            auth: {
                password: JSON.parse(AuthService.getAxiosAuth().auth).password,
                username: JSON.parse(AuthService.getAxiosAuth().auth).username
            }
        }
        axios.get(Auth.baseAddress + '/purchases-protected', auth).then(results => {
            this.setState({ user_purchases: results.data });

        })
    }

    getActivePurchases(){
        let auth = {
            auth: {
                password: JSON.parse(AuthService.getAxiosAuth().auth).password,
                username: JSON.parse(AuthService.getAxiosAuth().auth).username
            }
        }
        axios.get(Auth.baseAddress + '/active-chargers', auth).then(results => {
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





    componentDidMount() {
        this.getChargers()
        this.getPurchases()
        this.getActivePurchases()
    }


    render(){


        return (
            <React.Fragment>
                <Router>
                    <div className="App">
                        <Header isToggled={this.state.isToggled} handle={this.handleSideBarToggled}/>
                        <div id="page-content">
                            <Sidebar isToggled={this.state.isToggled}/>
                            <Switch>
                                <React.Fragment>
                                    <div className={styles.chargermap}>
                                        <Route exact path={'/'}>
                                            <MainPanel chargers={this.state.chargers}/>
                                        </Route>
                                        <Route path={`/chargers`}>
                                            <ChargersPanel error={this.state.error} errorHandler={this.errorHandler} purchase={this.state.purchase} active={this.state.activePurchase} start={this.startCharging} stop={this.stopCharging} chargers={this.state.chargers}/>
                                        </Route>
                                        <Route path={`/purchases`}>
                                            <PurchasesPanel purchases={this.state.user_purchases}/>
                                        </Route>
                                        <Route path={`/profile`}>
                                            <ProfilePanel/>
                                        </Route>
                                        <Route path={`/login`}>
                                            <Login/>
                                        </Route>
                                        <Route path={`/signup`}>
                                            <Signup/>
                                        </Route>
                                    </div>
                                </React.Fragment>
                            </Switch>
                        </div>
                    </div>

                </Router>
            </React.Fragment>


        );
    }
}

export default App;
