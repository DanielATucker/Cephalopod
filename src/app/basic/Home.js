import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import { row, column } from "./Home.css";

import SignUpForm from "./SignUpForm.js";

export class Home extends Component {
  render() {
    return (
      <>
        <div>
          <div className="page-header">
            <h3 className="page-title"> Landing </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    UI
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Home
                </li>
              </ol>
            </nav>
          </div>

          <div className="proBanner">
            <div>
              <span className="d-flex align-items-center purchase-popup">
                <p>Sign up to volunteer with us!</p>
                <a
                  href="leftistmediagroup.com/volunteering"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn btn-sm purchase-button ml-auto"
                >
                  Volunteer Now
                </a>
                <i
                  className="mdi mdi-close bannerClose"
                  onClick={this.toggleProBanner}
                ></i>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-12 grid-margin stretch-card">
              <div className="card corona-gradient-card">
                <div className="card-body py-0 px-0 px-sm-3">
                  <div className="row align-items-center">
                    <div className="col-4 col-sm-3 col-xl-2">
                      <img
                        src={require("../../assets/images/dashboard/Group126@2x.png")}
                        className="gradient-corona-img img-fluid"
                        alt="banner"
                      />
                    </div>

                    <div className="col-5 col-sm-7 col-xl-8 p-0">
                      <h4 className="mb-1 mb-sm-0">
                        Lets Overthrow Capitalism together
                      </h4>

                      <p className="mb-0 font-weight-normal d-none d-sm-block">
                        {" "}
                        The goal of overthrowing Capitalism will require many
                        subtasks, as the only way to defeat it is through the
                        power of love, or in other words, a multifaceted attack
                        from every angle possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <h4 className="card-title">Welcome to Leftist Media Group</h4>

                <div className="media">
                  <i className="mdi mdi-earth icon-md text-info d-flex align-self-center mr-3"></i>

                  <div className="row">
                    <div className="column">
                      <p>
                        {" "}
                        Leftist Media group is dedicated to Organizing the Left
                        and starting the Revolution.{" "}
                      </p>
                    </div>

                    <div className="column">
                      <p>
                        {" "}
                        Accomplishing this task will require educating the
                        masses on the effects of Capitalism. <br />
                        The goal of overthrowing Capitalism will require many
                        subtasks, as the only way to defeat it is through the
                        power of love, or in other words, a multifaceted attack
                        from every angle possible.{" "}
                      </p>
                    </div>

                    <div className="column">
                      <p>
                        {" "}
                        There is only a finite amount of time left as Capitalism
                        has sent us near the end of our climate catastrophe and
                        fascist leadership path. As such, Leftist Media Group is
                        creating a number of projects to be community lead, all
                        focused on a specific avenue of dismantling Capitalism
                        one brick at a time.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Wade</h4>

                  <div className="aligner-wrapper">
                    <Doughnut
                      data={this.transactionHistoryData}
                      options={this.transactionHistoryOptions}
                    />
                    <div className="absolute center-content">
                      <h5 className="font-weight-normal text-whiite text-center mb-2 text-white">
                        100%
                      </h5>
                      <p className="text-small text-muted text-center mb-0">
                        Wade
                      </p>
                    </div>
                  </div>

                  <p>
                    {" "}
                    Wade is a community response system made to assist with the
                    development, design, and organization of protests. Wade is
                    the mixture of Software and personnel.{" "}
                  </p>

                  <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                    <div className="text-md-center text-xl-left">
                      <h6 className="mb-1">Software</h6>
                    </div>

                    <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                      <h6 className="font-weight-bold mb-0">50%</h6>
                    </div>
                  </div>

                  <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                    <div className="text-md-center text-xl-left">
                      <h6 className="mb-1">Personnel</h6>
                    </div>

                    <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                      <h6 className="font-weight-bold mb-0">50%</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h4 className="card-title mb-1">Projects</h4>

                    <p className="text-muted mb-1">
                      All Projects need volunteers
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="preview-list">
                        <div className="preview-item border-bottom">
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-primary">
                              <i className="mdi mdi-file-document"></i>
                            </div>
                          </div>

                          <div className="preview-item-content d-sm-flex flex-grow">
                            <div className="flex-grow">
                              <h6 className="preview-subject">LMG - Memes</h6>
                              <p className="text-muted mb-0">
                                LMG - Memes is a facebook page that shares
                                leftist propaganda.
                              </p>
                            </div>

                            <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p className="text-muted">0 volunteers</p>
                              <p className="text-muted mb-0">? Tasks </p>
                              <p className="text-muted">? Issues</p>
                            </div>
                          </div>
                        </div>

                        <div className="preview-list">
                          <div className="preview-item border-bottom">
                            <div className="preview-thumbnail">
                              <div className="preview-icon bg-primary">
                                <i className="mdi mdi-file-document"></i>
                              </div>
                            </div>

                            <div className="preview-item-content d-sm-flex flex-grow">
                              <div className="flex-grow">
                                <h6 className="preview-subject">
                                  LMG for social media
                                </h6>
                                <p className="text-muted mb-0">
                                  New social media site
                                </p>
                              </div>

                              <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p className="text-muted">0 volunteers</p>
                                <p className="text-muted mb-0">? Tasks </p>
                                <p className="text-muted">? Issues</p>
                              </div>
                            </div>
                          </div>

                          <div className="preview-list">
                            <div className="preview-item border-bottom">
                              <div className="preview-thumbnail">
                                <div className="preview-icon bg-primary">
                                  <i className="mdi mdi-file-document"></i>
                                </div>
                              </div>

                              <div className="preview-item-content d-sm-flex flex-grow">
                                <div className="flex-grow">
                                  <h6 className="preview-subject">Sophia</h6>
                                  <p className="text-muted mb-0">
                                    Ask Leftist questions to be answered,
                                    discussed, or debated.{" "}
                                  </p>
                                </div>

                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                  <p className="text-muted">0 volunteers</p>
                                  <p className="text-muted mb-0">? Tasks </p>
                                  <p className="text-muted">? Issues</p>
                                </div>
                              </div>
                            </div>

                            <div className="preview-item border-bottom">
                              <div className="preview-thumbnail">
                                <div className="preview-icon bg-success">
                                  <i className="mdi mdi-cloud-download"></i>
                                </div>
                              </div>

                              <div className="preview-item-content d-sm-flex flex-grow">
                                <div className="flex-grow">
                                  <h6 className="preview-subject">Wade</h6>
                                  <p className="text-muted mb-0">
                                    Community response system made to assist
                                    with the development, design, and
                                    organization of protests.
                                  </p>
                                </div>

                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                  <p className="text-muted">0 Volunteers</p>
                                  <p className="text-muted mb-0">? Tasks </p>
                                  <p className="text-muted">? Issues</p>
                                </div>
                              </div>
                            </div>

                            <div className="preview-item border-bottom">
                              <div className="preview-thumbnail">
                                <div className="preview-icon bg-info">
                                  <i className="mdi mdi-clock"></i>
                                </div>
                              </div>

                              <div className="preview-item-content d-sm-flex flex-grow">
                                <div className="flex-grow">
                                  <h6 className="preview-subject">
                                    Leftism Through Music
                                  </h6>

                                  <p className="text-muted mb-0">
                                    This course will provide listeners with a
                                    playlist of 80+ downloadable leftist songs
                                    to listen to and reflect on centered around
                                    leftist topics.
                                  </p>
                                </div>

                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                  <p className="text-muted">0 Volunteers</p>
                                  <p className="text-muted mb-0">? Tasks</p>
                                  <p className="text-muted">? Issues</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  Leftist Media Group for social media
                </h4>

                <p>
                  !! all users assigned randomized username. DO NOT SHARE
                  PERSONAL DETAILS assume everyone is a cop !!
                </p>

                <div className="row">
                  <ul className="col-md-4 list-arrow">
                    <li>
                      Community
                      <li>
                        Mentorship
                        <p>
                          Leftist mentors find connect with new Leftists and
                          share knowledge and experience.
                        </p>
                      </li>
                      <li>
                        Music
                        <p>
                          Create and share playlists of leftist music tailored
                          to your friends
                        </p>
                      </li>
                    </li>

                    <br />

                    <li>
                      Education
                      <li>Intro to Leftistm guides.</li>
                      <li>Library of leftist texts.</li>
                    </li>

                    <br />
                  </ul>
                </div>

                <div className="row">
                  <div className="col-md-4">
                  <ul>
                    <li>
                      Organization
                      <li>
                        local Praxis meets
                        <p>
                          Choose public place in the city you live. <br />
                          Choose a community praxis task (garbage cleanup,
                          protest, unhoused assistance, ect) <br />
                          Others in your city rsvp to event and organize goals
                          and supplies
                          <br />
                          Task gets accomplished <br />
                          Achievement unlocked, Praxis
                        </p>
                      </li>
                    </li>

                    <br />

                    <li>
                      Emergency Fund
                      <p>
                        Directly send money to those in need. <br />
                        Recipient posts a request for assistance, specifying
                        situation. <br />
                        LMG verifies recipient is real person. <br />
                        Donor selects post, then is given preferred money
                        transfer details for recipient. <br />
                        Upon successful transaction, recipient may choose to
                        open a chat with the donor to thank them. <br />
                      </p>
                    </li>

                    <br />
                  </ul>
                  </div>
                </div>

                <div className="row">
                <div className="col-md-4">

                  <ul>
                    <li>
                      Knowledge sharing
                      <li>
                        Sophia (forum)
                        <li>
                          Ask Leftist questions to be answered, discussed, or
                          debated. <br />
                          Questions can simply be simply answered or escalated
                          into a formal debate with Debate Blocks. <br />
                          Evidence based, community Debate Blocks. <br />
                          Within traditional debate, you have a thesis or main
                          point, and that's made up of premises or single
                          arguments. <br />
                          Within Sophia, things are the same, but a bit
                          different, Sophia uses rectangular blocks to visualize
                          argumentation. <br />
                          First, there is a main point to be debated that is
                          titled with a debatable thesis eg. "Anarcho-syndaclism
                          is a progression from state-communism", then you can
                          post a premise block to the discussion. <br />
                          Each premise block is a 2D rectangle covered in text.{" "}
                          <br />
                          Premise blocks are divided into supporting (green),
                          neutral (grey), or opposing (red). <br />
                          Multiple premises can connected to a thesis in a one
                          way direction. <br />
                          If someone has thoughts on your premise, they can post
                          a thought, or add a premise to your premise that
                          either supports, opposes or is neutral to your
                          premise. <br />
                          Sophia will generate meaningful, thought progressing
                          ideas and Praxis. <br />
                        </li>
                      </li>
                    </li>
                  </ul>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Volunteering</h4>

                <div className="media">
                  <i className="mdi mdi-account-multiple-plus text-info d-flex align-self-center mr-3"></i>
                  <div className="row">
                    <div className="column">
                      <p> How to get started </p>
                    </div>

                    <div className="column">
                      <p>
                        {" "}
                        Leftist Media Group is recruiting for volunteers to
                        spread revolutionary propaganda.{" "}
                      </p>
                    </div>

                    <div className="column">
                      <p>
                        {" "}
                        If you'd like to join the Revolution, send a email to an
                        admin at LeftistMediaGroup@Gmail.com{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <SignUpForm></SignUpForm>
              </div>
            </div>
          </div>

          <div className="grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Contact</h4>
                <div className="row">
                  <div className="col-md-6">
                    <address>
                      <p className="font-weight-bold">Leftist Media Group</p>

                      <br />

                      <h5> Coverage: </h5>

                      <p> USA </p>
                      <p> Canada </p>
                      <p> UK </p>
                    </address>
                  </div>

                  <div className="col-md-6">
                    <address className="text-primary">
                      <p className="font-weight-bold"> E-mail </p>
                      <p className="mb-2"> LeftistMediaGroup@Gmail.com </p>
                      <p className="font-weight-bold"> Web Address </p>
                      <p> LeftistMediaGroup.org </p>
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
