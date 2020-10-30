import React, {Component} from "react";
import SearchResult from "../Components/SearchResult";
import axios from "axios";
import AuthService from "../services/auth";
import {Button, Form, FormControl} from "react-bootstrap";
import clsx from "clsx";
import styles from "./Search.module.css";
import {BsXCircle} from "react-icons/bs/index";

export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: [],
            value: '',
            active: false
        }
        this.handleFormClick = this.handleFormClick.bind(this)
        this.getSearchChargers = this.getSearchChargers.bind(this)
        this.closeSearch = this.closeSearch.bind(this)
    }

    getSearchChargers(event){
        this.setState({value: event.target.value, active: true}, () => {
            axios.post(AuthService.baseAddress + '/chargers-search', {search:this.state.value})
                .then(results => {
                    this.setState({ search: results.data });
                }).catch(error =>
                {
                    console.log(error);
                }
            )
        });

    }

    handleFormClick(){
        this.setState(state => ({
            data: [],
            active: false
        }))
    }


    closeSearch(){
        this.setState(state => ({
            active: false,
            value: ''
        }))
    }



    render() {

        return(
            <div>
                {this.state.active&&(<SearchResult getMapCenterData={this.props.getMapCenterData} search={this.state.search}/>)}
                <Form inline>
                    <FormControl type="text" placeholder="Search" value={this.state.value} className={clsx(styles.search, "mr-sm-2")} onChange={this.getSearchChargers} onClick={this.handleFormClick} />
                    <Button onClick={this.closeSearch} variant="outline-success"><BsXCircle/></Button>
                </Form>
            </div>

        )
    }
}