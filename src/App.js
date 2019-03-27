import React, { Component } from "react";
import ResultsList from "./components/ResultsList/ResultsList";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import "./App.css";
import _ from "lodash";

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
      loading: false
    };
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = (event) => {
    if (document.activeElement.classList.value === 'ResultsList-button') {
      let nodes = Array.prototype.slice.call( document.getElementsByClassName('ResultsList-button'));
      let length = nodes.length;
      let index = nodes.indexOf(document.activeElement);
      if (event.keyCode === 38) {
        if (index === 0)
          nodes[length - 1].focus();
        else
          nodes[index - 1].focus();
      } else if (event.keyCode === 40) {
        if (index === length - 1)
          nodes[0].focus();
        else
          nodes[index + 1].focus();
      }
    }
  }

  // callAPI = _.throttle((value) => {
  //   this.setState({loading: true});
  //     fetch(API_URL + value)
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           this.setState({loading: false});
  //           let filteredResult = result.filter((item)=>{
  //             return item.name.toLowerCase().indexOf(value.toLowerCase()) === 0;
  //           });
  //           this.setState({
  //             resultList: filteredResult
  //           });
  //         },
  //         (error) => {
  //           this.setState({loading: false});
  //           alert('Error calling API');
  //         }
  //   )},500);

  callAPI = _.debounce(async(value) => {
    try {
      this.setState({loading: true, suburb: value});
      let res = await fetch(API_URL + value);
      let result = await res.json();
      this.setState({loading: false});
      let filteredResult = result.filter((item)=>{
        return item.name.toLowerCase().indexOf(value.toLowerCase()) === 0;
      });
      this.setState({
        resultList: filteredResult
      });
    } catch(error) {
      this.setState({loading: false});
      alert('Error calling API');
    }

  },500);

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

  onSelectItem = (item) => {
    this.setState({suburb: item.name, suburbDetail: item});
  }

  render() {
    return (
      <section>
        <Input value={this.state.suburb} onChange={this.callAPI}/>
        {this.state.suburb && <ResultsList onSelect={this.onSelectItem} items={this.state.resultList} loading={this.state.loading}/>}
        <Button onClick={this.onClickButton}/>
      </section>
    );
  }
}
