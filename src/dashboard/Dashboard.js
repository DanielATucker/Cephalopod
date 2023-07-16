import React, { Component } from "react";

import { VectorMap } from "react-jvectormap";

import Chat from "../chat/Chat.js";
import Calendar1 from "./Calendar.js";
import Stats from "./stats/Stats.js";
import Music from "./music/Music.js";
import Sync from "./sync/Sync.js";
import Kanban1 from "./kanban/kanban.js";

import { ProSidebarProvider } from "react-pro-sidebar";

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Dashboard extends Component {
  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  render() {
    return (
      <div>
        <Calendar1></Calendar1>

        <ProSidebarProvider>
          <Chat></Chat>
        </ProSidebarProvider>

        <Music></Music>

        <div className="row">
          <div className="col-md grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Visitors by Countries</h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>USA</td>
                            <td className="text-right"> 1500 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              56.35%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>Germany</td>
                            <td className="text-right"> 800 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              33.25%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>Australia</td>
                            <td className="text-right"> 760 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              15.45%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right"> 450 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              25.00%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>Romania</td>
                            <td className="text-right"> 620 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              10.25%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right"> 230 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              75.00%{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent" //change it to ocean blue: #0077be
                      panOnDrag={true}
                      containerClassName="dashboard-vector-map"
                      focusOn={{
                        x: 0.5,
                        y: 0.5,
                        scale: 1,
                        animate: true,
                      }}
                      series={{
                        regions: [
                          {
                            scale: ["#3d3c3c", "#f2f2f2"],
                            normalizeFunction: "polynomial",
                            values: mapData,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Stats></Stats>

        <Sync></Sync>
      </div>
    );
  }
}

export default Dashboard;
