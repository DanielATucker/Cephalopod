import React, { Component } from "react";

import { Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import Dropzone from 'react-dropzone'
import MyDropZone from "./MyDropZone";
import PouchDB from 'pouchdb'

import { Buffer } from "buffer";
import { CheckBox } from "@mui/icons-material";


export default class AdminStickers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stickerUrls: [],
      stickerCampaigns: {},
    };
  }

  GetStickers = () => {
    new Promise((resolve, reject) => {
      axios
        .get(`https://${process.env.host}/getAdminStickers`,
          {
            withCredentials: true,
          })
        .then((result) => {
          console.log(`Result: ${JSON.stringify(result, null, 2)}`);
          this.setState({ stickerUrls: result.data });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
      resolve()

    })
  }

  toggleActivated = (stickerUrl) => (event) => {
    console.log(`StickerUrl: ${stickerUrl}`);
    console.log(`Event: ${event.target.checked}`);

    axios
      .put(`https://${process.env.host}/adminStickers/toggleActivated`,
        {
          stickerURL: stickerUrl,
          activated: event.target.checked
        },
        {
          withCredentials: true,
        })
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result, null, 2)}`);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  GetStickerCampaigns = () => {
    console.log(`Get Sticker Campaigns`)

  }

  renderStickers = () => {
    let stickerImages = this.state.stickerUrls.map((stickerUrl) => {
      console.log(`StickerUrl: ${stickerUrl}`);
      console.log(`Data: ${JSON.stringify(this.state.stickerCampaigns[stickerUrl], null, 2)}`)

      let imgSrc = `https://home.tail5cd89.ts.net:5001/AdminStickers/${stickerUrl}`;
      let stickerName = stickerUrl.split('.')[0];


      if (this.state.stickerCampaigns[stickerUrl] !== undefined) {
        return (
          <tr>
            <td>{stickerName}</td>
            <td><img src={imgSrc} alt="sticker" style={{
              width: 200,
              height: 200
            }} /></td>
            <td>
              <FormGroup>
                <FormControlLabel control={
                  <Checkbox
                    size="small"
                    checked={this.state.stickerCampaigns[stickerUrl].activated}
                    onChange={this.toggleActivated(stickerUrl)}
                  />
                } label="Activated?" />
              </FormGroup>
            </td>
            <td>{this.state.stickerCampaigns[stickerUrl].campaignName}</td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>{stickerName}</td>
            <td><img src={imgSrc} alt="sticker" style={{
              width: 200,
              height: 200
            }} /></td>
            <td>
              <FormGroup>
                <FormControlLabel control={<Checkbox size="small" />} label="Activated?" />
              </FormGroup>
            </td>
            <td>None</td>
          </tr>
        );
      }
    })

    return stickerImages;
  }




  componentDidMount() {
    this.GetStickers();
  }

  componentDidUpdate() {
    this.GetStickerCampaigns();
  }

  render() {
    return (
      <Card>
        <CardContent>
          <h1>Stickers</h1>

          <div className="table-responsive">
            <table class="table" border="1px">
              <thead>
                <tr>
                  <th>Sticker Name</th>
                  <th>Sticker Image</th>
                  <th>Activated</th>
                  <th>Champaigns</th>

                </tr>
              </thead>
              <tbody>
                {this.renderStickers()}
              </tbody>
            </table>

          </div>

        </CardContent>
      </Card>
    );
  }
}
