import PropTypes from "prop-types";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import lightGreen from "material-ui/colors/lightGreen";
import lightBlue from "material-ui/colors/lightBlue";
import red from "material-ui/colors/red";
import Button from "material-ui/Button";

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: lightBlue,
    error: red
  }
});

export default () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Button raised color="primary">
          Primary
        </Button>
        <Button color="accent">Accent</Button>
      </div>
    </MuiThemeProvider>
  );
};
