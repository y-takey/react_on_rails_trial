import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import ChevronRightIcon from "material-ui-icons/ChevronRight";
import GroupIcon from "material-ui-icons/Android";
import TodoIcon from "material-ui-icons/AlarmOn";
import ChartIcon from "material-ui-icons/Assessment";
import Login from "./components/Login";
import GroupList from "./components/group/List";
import TodoList from "./components/todo/List";
import ChartList from "./components/chart/List";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    marginTop: 0,
    paddingTop: 0,
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    marginTop: 0,
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: "absolute",
    marginTop: 0,
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: 60,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerInner: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    }
  }
});

const routes = [
  {
    path: "/",
    exact: true,
    main: GroupList
  },
  {
    path: "/login",
    main: Login
  },
  {
    path: "/groups",
    main: GroupList
  },
  {
    path: "/todos",
    main: TodoList
  },
  {
    path: "/charts",
    main: ChartList
  }
];

const menuItem = ([title, Icon, path]) =>
  <ListItem button key={`list-${title}`}>
    <ListItemIcon>
      <Link to={path}>
        <Icon />
      </Link>
    </ListItemIcon>
    <Link to={path}>
      <ListItemText primary={title} />
    </Link>
  </ListItem>;

class Frame extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { isAuthenticated, classes, theme } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="contrast"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  React on Rails TRIAL
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              type="permanent"
              open={this.state.open}
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
              }}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
                  {[["Group", GroupIcon, "/groups"], ["ToDo", TodoIcon, "/todos"]].map(menuItem)}
                </List>
                <Divider />
                <List>
                  {menuItem(["Chart", ChartIcon, "/charts"])}
                </List>
              </div>
            </Drawer>
            <main className={classes.content}>
              <Route path="/login" component={Login} />
              {isAuthenticated
                ? routes.map((route, index) =>
                    <Route key={index} path={route.path} exact={route.exact} component={route.main} />
                  )
                : <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: this.props.location }
                    }}
                  />}
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Frame);
