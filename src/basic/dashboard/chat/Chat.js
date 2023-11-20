import React, { Component } from "react";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Card, CardContent } from "@mui/material";

export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDiscussions: true,
      showMessages: false,
    };

    this.showDiscussions = this.showDiscussions.bind(this);
    this.showMessages = this.showMessages.bind(this);
  }

  collapseSidebar() {}

  showDiscussions() {
    this.setState({
      showDiscussions: !this.state.showDiscussions,
    });
  }

  showMessages() {
    this.setState({
      showMessages: !this.state.showMessages,
    });
  }

  Messages() {
    return (
      <div className="col grid-margin ">
        <div className="card">
          <div className="card-body">
            <div className="justify-content-between">
              <h4 className="card-title">Messages</h4>

              <p className="text-muted mb-1 small">View all</p>
            </div>

            <div className="preview-list">
              <div className="preview-item border-bottom">
                <div className="preview-thumbnail"></div>

                <div className="preview-item-content d-flex flex-grow">
                  <div className="flex-grow">
                    <div className="d-flex d-md-block d-xl-flex justify-content-between">
                      <h6 className="preview-subject">Leonard</h6>

                      <p className="text-muted text-small">5 minutes ago</p>
                    </div>

                    <p className="text-muted">
                      Well, it seems to be working now.
                    </p>
                  </div>
                </div>
              </div>

              <div className="preview-item border-bottom">
                <div className="preview-thumbnail"></div>

                <div className="preview-item-content d-flex flex-grow">
                  <div className="flex-grow">
                    <div className="d-flex d-md-block d-xl-flex justify-content-between">
                      <h6 className="preview-subject">Luella Mills</h6>

                      <p className="text-muted text-small">10 Minutes Ago</p>
                    </div>

                    <p className="text-muted">
                      Well, it seems to be working now.
                    </p>
                  </div>
                </div>
              </div>

              <div className="preview-item border-bottom">
                <div className="preview-thumbnail"></div>

                <div className="preview-item-content d-flex flex-grow">
                  <div className="flex-grow">
                    <div className="d-flex d-md-block d-xl-flex justify-content-between">
                      <h6 className="preview-subject">Ethel Kelly</h6>

                      <p className="text-muted text-small">2 Hours Ago</p>
                    </div>
                    <p className="text-muted">Please review the tickets</p>
                  </div>
                </div>
              </div>

              <div className="preview-item border-bottom">
                <div className="preview-thumbnail"></div>

                <div className="preview-item-content d-flex flex-grow">
                  <div className="flex-grow">
                    <div className="d-flex d-md-block d-xl-flex justify-content-between">
                      <h6 className="preview-subject">Herman May</h6>

                      <p className="text-muted text-small">4 Hours Ago</p>
                    </div>

                    <p className="text-muted">
                      Thanks a lot. It was easy to fix it .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Card>
        <CardContent>
          <div className="row">
            <div className="col-md grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div
                    id="app"
                    style={({ height: "100vh" }, { display: "flex" })}
                  >
                    <Sidebar style={{ height: "100vh" }}>
                      <Menu>
                        <MenuItem
                          icon={<MenuOutlinedIcon />}
                          onClick={() => {
                            this.collapseSidebar();
                          }}
                          style={{ textAlign: "center" }}
                        >
                          Discussions & Messages
                        </MenuItem>

                        <MenuItem
                          icon={<HomeOutlinedIcon />}
                          onClick={() => {
                            this.showDiscussions();
                          }}
                        >
                          Discussions
                        </MenuItem>
                        <MenuItem icon={<ReceiptOutlinedIcon />}>
                          New Discussion
                        </MenuItem>

                        <MenuItem
                          icon={<PeopleOutlinedIcon />}
                          onClick={() => {
                            this.showMessages();
                          }}
                        >
                          Messages
                        </MenuItem>

                        <MenuItem icon={<ContactsOutlinedIcon />}>
                          Contacts
                        </MenuItem>
                      </Menu>
                    </Sidebar>
                    <main>
                      {this.state.showDiscussions && (
                        <div className="col grid-margin ">
                          <div className="card">
                            <div className="card-body">
                              <h3> End of Discussions </h3>
                              <p>
                                {" "}
                                Ask a question or post a new topic to discuss{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.showMessages && this.Messages()}
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Chat;
