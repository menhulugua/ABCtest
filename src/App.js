import React, { Component } from "react";
import ResultsList from "./components/ResultsList/ResultsList";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

// const API_SAMPLE = [
//   { name: "Sydney South", state: { abbreviation: "NSW" } },
//   { name: "Sydney", state: { abbreviation: "NSW" } },
//   { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
//   { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
//   { name: "Sydenham", state: { abbreviation: "VIC" } }
// ];


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suburb: "",
      suburbDetail: null,
      resultList: [],
      loading: false,
      searchTimeout: null
    };
  }

  componendDidMount() {

  }

  callAPI = (value) => {
    this.setState({loading: true, searchTimeout: null});
    fetch(API_URL + value)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({loading: false});
          let filteredResult = result.filter((item)=>{
            return item.name.toLowerCase().indexOf(value.toLowerCase()) === 0;
          });
          this.setState({
            resultList: filteredResult
          });
        },
        (error) => {
          this.setState({loading: false});
          alert('Error calling API');
        }
      )
  }

  onClickButton = () => {
    if (this.state.suburb) {
      if (this.state.suburbDetail && this.state.suburb === this.state.suburbDetail.name)
        alert("Your recent selection is " + this.state.suburb + ", postcode: " + this.state.suburbDetail.postcode + ", state: " + this.state.suburbDetail.state.name);
      else {
        if (this.state.resultList.length)
          alert("Please select a suburb from result list");
        else
          alert("Your input " + this.state.suburb + " doesn't match any search result");
      }
    }
    else {
      alert("Please input a suburb");
    }
  }

  onInputChange = (value) => {
    if (!this.state.searchTimeout)
      this.setState({searchTimeout: setTimeout(() => {this.callAPI(value);}, 500)});
    else {
      clearTimeout(this.state.searchTimeout);
      this.setState({searchTimeout: setTimeout(() => {this.callAPI(value);}, 500)});
    }
    this.setState({suburb: value});

  }

  onSelectItem = (item) => {
    this.setState({suburb: item.name, suburbDetail: item});
  }

  render() {
    return (
      <section>
        <Input value={this.state.suburb} onChange={this.onInputChange}/>
        {this.state.suburb && !this.state.searchTimeout && <ResultsList onSelect={this.onSelectItem} items={this.state.resultList} loading={this.state.loading}/>}
        <Button onClick={this.onClickButton}/>
      </section>
    );
  }
}
