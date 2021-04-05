import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { DATAS } from "../../Data/DummyDatas";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import "./Main.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: null,
      loggedUser: "",
      selectedUser: "",
      search: "",
      message: "",
      chats: null,
      orgDatas: [],
      sendMessageToUser: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loggedUser: nextProps.dataParam,
      chats: nextProps.chatMessages,
      datas: DATAS,
      orgDatas: DATAS,
      message: "",
      selectedUser: "",
      sendMessageToUser: [],
    });
  }

  onSearch = (e) => {
    this.setState({ selectedUser: "" });
    if (e.target.value) {
      const searchText = e.target.value.toLowerCase();
      const searchDatas = this.state.orgDatas;
      this.setState({
        datas: searchDatas.filter(
          (data) =>
            data.name && data.name.toLowerCase().indexOf(searchText) !== -1
        ),
      });
    } else {
      this.setState({ datas: this.state.datas });
    }
  };

  sendData = (row) => {
    if (row.name != this.state.selectedUser.name) {
      this.setState({
        selectedUser: row,
        message: "",
        sendMessageToUser: [],
      });
    }
  };
  handleMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };
  onKeyPress = (e) => {
    if (e.which === 13) {
      this.sendMessage();
    }
  };

  sendMessage = (e) => {
    let { message, sendMessageToUser } = this.state;
    sendMessageToUser.push(message);
    const elementsIndex = this.state.datas.findIndex(
      (element) => element.id == this.state.selectedUser.id
    );
    let newArray = this.state.datas;
    var obj = {
      [`${this.state.loggedUser}`]: this.state.message,
    };
    newArray[elementsIndex].notificationMessage.push(obj);
    this.setState({
      datas: newArray,
      message: "",
    });
  };

  render() {
    const {
      datas,
      loggedUser,
      selectedUser,
      message,
      sendMessageToUser,
      chats,
    } = this.state;
    const { classes } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <Container maxWidth="xl">
          {loggedUser ? (
            <Box display="flex" p={1} m={1} bgcolor="background.paper">
              <Box p={1} m={1} width={500} alignSelf="flex-start">
                <div className="bar">
                  <input
                    className="searchbar"
                    placeholder="Search Name..."
                    type="text"
                    onChange={(e) => this.onSearch(e)}
                  />
                  <div
                    style={{
                      float: "right",
                      marginRight: "13px",
                      marginTop: "13px",
                    }}
                  >
                    <SearchIcon
                      fontSize="default"
                      style={{
                        color: "#7367F0",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  {datas.length > 0 ? (
                    <>
                      {datas
                        .filter((usr) => usr.name != loggedUser)
                        .map((item, index) => (
                          <>
                            <List
                              className={classes.root}
                              alignItems="flex-start"
                            >
                              <ListItem
                                alignItems="center"
                                button
                                onClick={() => this.sendData(item)}
                              >
                                <ListItemAvatar>
                                  <Avatar alt="Avatar" src={item.userImage} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={item.name}
                                  secondary={
                                    <React.Fragment>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                      >
                                        {item.email}
                                      </Typography>
                                      |{item.companyName}
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                  <CommentIcon
                                    onClick={() => this.sendData(item)}
                                  />
                                </IconButton>
                              </ListItemSecondaryAction>
                              <Divider variant="inset" component="li" />
                            </List>
                          </>
                        ))}
                    </>
                  ) : (
                    <p>No Users Found</p>
                  )}
                </div>
              </Box>

              <Box
                p={1}
                width="100%"
                style={{ borderRadius: "4px" }}
                bgcolor="grey.300"
              >
                <Box display="flex" m={1} p={1}>
                  <Box p={1} width={350} style={{ textAlign: "left" }}>
                    {selectedUser.name}
                  </Box>
                  <Box width={350} style={{ textAlign: "left" }} p={1}>
                    {selectedUser.email}
                  </Box>
                  <Box p={1} style={{ textAlign: "right" }}>
                    {selectedUser.companyName}
                  </Box>
                </Box>
                <hr />
                <Box
                  display="flex"
                  m={1}
                  p={1}
                  height={350}
                  style={{ overflowY: "scroll" }}
                >
                  <Box p={1} flexGrow={1}>
                    {selectedUser ? (
                      <>
                        {chats ? (
                          <>
                            {chats
                              .filter(
                                (item) => Object.keys(item) == selectedUser.name
                              )
                              .map((item) => (
                                <>
                                  <p className="receivedMessage">
                                    {Object.values(item)}
                                  </p>
                                </>
                              ))}
                          </>
                        ) : (
                          <p>no notification</p>
                        )}
                        {sendMessageToUser && (
                          <>
                            {sendMessageToUser.map((item) => (
                              <>
                                <p className="sendMessage">{item}</p>
                                <br /> <br />
                              </>
                            ))}
                          </>
                        )}
                      </>
                    ) : (
                      <h3 className="selectUser">Select User to chat</h3>
                    )}
                  </Box>
                </Box>
                {selectedUser ? (
                  <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    style={{ borderRadius: "10px" }}
                  >
                    <Box p={1} style={{ textAlign: "left" }} flexGrow={1}>
                      <input
                        className="messageBox"
                        type="text"
                        placeholder="Send Message. . ."
                        style={{ width: "100%" }}
                        value={message}
                        onChange={this.handleMessage}
                        onKeyPress={this.onKeyPress}
                      />
                    </Box>
                    <Box p={1}>
                      <SendIcon
                        style={{
                          marginTop: "1px",
                          cursor: "pointer",
                          color: "#0000008a",
                        }}
                        onClick={this.sendMessage}
                      />
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Box>
          ) : (
            <div className={classes.center}>
              <Typography color="textSecondary" variant="h4">
                Login To Continue
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                Explore the chatting application
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                <span>
                  <b>Functionality Added:</b>
                </span>
                User Login, Search user using search bar, chat with users.
              </Typography>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Main);