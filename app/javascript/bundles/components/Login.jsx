import PropTypes from "prop-types";
import React from "react";
import { FormGroup } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import axios from "axios";

// const csrfToken = document.querySelector(`meta[name="csrf-token"]`).content;
//
// axios.defaults.headers.common["X−CSRF-Token"] = csrfToken;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    redirectToReferrer: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  login = () => {
    const { email, password } = this.state;
    const [csrfParam, csrfToken] = ["csrf-param", "csrf-token"].map(
      key => document.querySelector(`meta[name="${key}"]`).content
    );
    axios
      .post("/users/sign_in", { user: { email, password }, [csrfParam]: csrfToken })
      .then(response => {
        console.log("auth success.");
      })
      .catch(error => {
        console.error("auth failed.");
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { email, password, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form noValidate autoComplete="off">
        <FormGroup row>
          <TextField
            id="email"
            label="Name"
            type="email"
            margin="normal"
            value={email}
            onChange={this.handleChange("email")}
          />
        </FormGroup>
        <FormGroup row>
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={password}
            onChange={this.handleChange("password")}
          />
        </FormGroup>
        <FormGroup row>
          <Button raised color="primary" onClick={this.login}>
            LOGIN
          </Button>
        </FormGroup>
      </form>
    );
  }
}
