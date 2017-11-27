import PropTypes from "prop-types";
import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

export default class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    // TODO: request to login then
    // this.setState({ redirectToReferrer: true });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form noValidate autoComplete="off">
        <TextField id="name" label="Name" margin="normal" />
        <TextField id="password" label="Password" type="password" autoComplete="current-password" margin="normal" />
        <Button raised color="primary">
          LOGIN
        </Button>
      </form>
    );
  }
}
