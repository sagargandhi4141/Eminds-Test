import React, { Component } from "react";

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: "",
      FAILURE_COEFF: 10,
      MAX_SERVER_LATENCY: 200,
      options: [],
    };
    // this.inputRef = React.createRef();
  }

  // ========== Mock Server Start =============

  getRandomBool = (n) => {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) n = maxRandomCoeff;
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
  };

  getSuggestions = (text) => {
    var pre = "pre";
    var post = "post";
    var results = [];
    if (this.getRandomBool(2)) {
      results.push(pre + text);
    }
    if (this.getRandomBool(2)) {
      results.push(text);
    }
    if (this.getRandomBool(2)) {
      results.push(text + post);
    }
    if (this.getRandomBool(2)) {
      results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
      var randomTimeout = Math.random() * this.state.MAX_SERVER_LATENCY;
      setTimeout(() => {
        if (this.getRandomBool(this.state.FAILURE_COEFF)) {
          reject();
        } else {
          resolve(results);
        }
      }, randomTimeout);
    });
  };

  changeHandler = (e) => {
    this.setState({ inputVal: e.target.value }, () => {
      this.getSuggestions(e.target.value).then((data) => {
        this.setState({
          options: data.map((elem) => {
            return { id: elem, value: elem, label: elem };
          }),
        });
      });
    });
  };

  dropdownClicked = (e) => {
    this.setState({ inputVal: e.target.value });
  };

  render() {
    const { options } = this.state;
    console.log(options);
    return (
      <div>
        <div>
          <select
            style={{
              position: "absolute",
              width: "500px",
              height: "50px",
              color: "black",
            }}
            value={this.state.inputVal}
            onChange={this.dropdownClicked}
          >
            {options.map((elem) => {
              return (
                <option
                  style={{ color: "black" }}
                  id={elem.id}
                  label={elem.label}
                  value={elem.value}
                />
              );
            })}
          </select>
          <input
            style={{
              position: "relative",
              top: 1,
              left: 1,
              width: "400px",
              height: "40px",
              border: "1px solid transparent"
            }}
            type="text"
            value={this.state.inputVal}
            onChange={this.changeHandler}
          />
        </div>
      </div>
    );
  }
}

export default InputField;
