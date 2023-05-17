import React, { Component } from "react";


export class Education extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Education </h3>
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
                  <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                    <button className="btn btn-outline-light btn-rounded get-started-btn">
                      See Projects
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Topics to explore</h4>
              <ul className="list-arrow">
                <li> What is Capitalism? </li>
                <li> Anarchism? </li>
                <li> What is Marxism? </li>
                <li> Communism </li>
                <li> ACAB </li>
                <li> Revolution </li>
                <li> Workers Rights </li>
                <li> BLM </li>
                <li> Revolutionary Thinking </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">What is Capitalism?</h4>

              <div className="media">
                <i className="mdi mdi-earth icon-md text-info d-flex align-self-center mr-3"></i>

                <div class="row" className="media-body">
                  <div class="column">
                    <p>
                      {" "}
                      The following statement is not to be taken lightheartedly.{" "}
                    </p>
                  </div>

                  <div class="column">
                    <p>
                      {" "}
                      If you, as an individual reading these words do not take
                      the time to educate yourself on The effects that
                      capitalism has had, you are personally turning your back
                      on existence as a whole.{" "}
                    </p>
                  </div>

                  <div class="column">
                    <p>
                      {" "}
                      Capitalism faces as an economic system. An economic system
                      that is branded best in the world.{" "}
                    </p>
                  </div>
                </div>

                <div class="row" className="media-body">
                  <div class="column">
                    <p>
                      {" "}
                      Within Capitalism, you buy things in order to live. At
                      first glance, this seems normal, "This is the way things
                      have always been" one might think, but that idea is
                      completely debunked. For example, Indigenous peoples, at
                      least those of North America, did not use money to
                      survive, instead they shared what they had as a community.{" "}
                    </p>
                  </div>

                  <div class="column">
                    <p>
                      {" "}
                      The point here, is that Capitalism is an idea that someone
                      came up with. That idea, that one must buy things in order
                      to live, has resulted in an unimaginably large amount of
                      human, animal, and ecological suffering and death
                      paralleled only by Mass Extinction events.{" "}
                    </p>
                  </div>

                  <div class="column">
                    <p>
                      {" "}
                      This website is dedicated to showing how Capitalism has
                      caused this, and the much prettier note of what we can do
                      to fix it.{" "}
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
              <h4 className="card-title">What is Anarchism?</h4>

              <div className="media">
                <i className="mdi mdi-earth icon-md text-info d-flex align-self-center mr-3"></i>

                <div class="row" className="media-body">
                  <div class="column">
                    <p>
                      {" "}
                      Anarchism is one of the many alternatives to Capitalism.{" "}
                    </p>
                  </div>

                  <div class="column">
                    <p>
                      {" "}
                      Within Anarchism, there are many different philosophies.
                      The main point behind Anarchism is that there is no
                      central government.
                    </p>
                  </div>

                  <div class="column">
                    <p>
                      {" "}
                      The specific philosophy under Anarchism that LMG
                      subscribes to is Anarcho-Syndicalism. Within
                      Anarcho-Syndicalism, the biggest decisions in society are
                      made by the specific workers in it's respective industry.{" "}
                    </p>
                  </div>
                </div>

                <div class="row" className="media-body">
                  <div class="column">
                    <p>
                      {" "}
                      This is in sharp contrast to our current system, where we
                      essentially "elect" some random person to in theory,
                      represent our personal views about how the world should be
                      run. Then the person that's convinced the most people to
                      elect them, get's to essentially run the geopolitical
                      stage.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Education;