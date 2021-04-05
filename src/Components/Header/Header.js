import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { DATAS } from "../../Data/DummyDatas";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { withSnackbar } from "notistack";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Main from "../Main/Main";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: "80%",
    backgroundColor: theme.palette.background.paper,
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: DATAS,
      loggedUser: "",
      anchorEl: false,
      open: false,
      openPopover: false,
      anchorElPopover: false,
      notification: "",
    };
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };
  handleNotificationClick = (event) => {
    this.setState({
      anchorElPopover: event.currentTarget,
      openPopover: !this.state.open,
    });
  };
  handleNotificationClose = () => {
    this.setState({
      openPopover: false,
    });
  };

  flipOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleUsers = (e) => {
    this.setState({
      loggedUser: e.target.getAttribute("name"),
      datas: DATAS,
    });
    this.props.enqueueSnackbar(
      `Signed in as ${e.target.getAttribute("name")}`,
      {
        variant: "success",
      }
    );
    this.flipOpen();
    const found = this.state.datas.find(
      (element) => element.name === e.target.getAttribute("name")
    );
    this.setState({
      notification: found.notificationMessage,
    });
  };

  logOut = () => {
    this.setState({
      loggedUser: "",
      notification: "",
    });
    this.flipOpen();
  };
  render() {
    const { classes } = this.props;
    const { datas, loggedUser, anchorEl, open, notification } = this.state;
    return (
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                DoodleBlue User
              </Typography>
              {loggedUser ? (
                <>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge
                      badgeContent={notification ? notification.length : 0}
                      color="secondary"
                    >
                      <NotificationsIcon
                        onClick={this.handleNotificationClick}
                      />
                    </Badge>
                  </IconButton>
                  <Popover
                    style={{
                      padding: "5px",
                    }}
                    open={this.state.openPopover}
                    anchorEl={this.state.anchorElPopover}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    targetOrigin={{ horizontal: "left", vertical: "top" }}
                    onClose={(event) => this.handleNotificationClose(event)}
                  >
                    {notification ? (
                      <>
                        {notification.reverse().map((item) => (
                          <>
                            <div className={classes.paper}>
                              {Object.keys(item) +
                                " messaged as " +
                                Object.values(item)}
                            </div>
                            <hr />
                          </>
                        ))}
                      </>
                    ) : (
                      <p>no notification</p>
                    )}
                  </Popover>
                </>
              ) : null}

              <Button color="inherit" onClick={this.handleClick}>
                {loggedUser ? loggedUser : "Login"}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.flipOpen}
              >
                {loggedUser ? (
                  <>
                    {datas
                      .filter((usr) => usr.name !== loggedUser)
                      .map((data, index) => (
                        <>
                          <MenuItem
                            key={index}
                            value={data.name}
                            name={data.name}
                            onClick={this.handleUsers}
                          >
                            <Avatar alt="Avatar" src={data.userImage} />
                            {data.name}
                          </MenuItem>
                        </>
                      ))}
                    <hr style={{ margin: 0 }} />
                    <MenuItem
                      style={{ marginLeft: "7px" }}
                      onClick={this.logOut}
                    >
                      <PowerSettingsNewIcon style={{ color: "#0000008a" }} />
                      <span style={{ marginLeft: "11px" }}>LogOut</span>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    {datas.map((data, index) => (
                      <MenuItem
                        key={index}
                        value={data.name}
                        name={data.name}
                        onClick={this.handleUsers}
                      >
                        <Avatar src={data.userImage} /> {data.name}
                      </MenuItem>
                    ))}
                  </>
                )}
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
        <Main dataParam={loggedUser} chatMessages={notification} />
      </>
    );
  }
}

export default withStyles(useStyles)(withSnackbar(Header));