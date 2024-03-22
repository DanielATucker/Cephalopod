import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class CommunitySupportNetwork extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Community Support Network</h1>

            <p>The Community Support Network is a group of people deticated to the Community aspect of Leftism.</p>

            <Card>
              <CardContent>
                <h3>Buddy System</h3>

                <p>Feeling isolated from all the stressors of capitalism?</p>
                <p>Need someone to check in on you from time to time?</p>
                <p>Have the energy to check on someone?</p>
                <p>Then join the Community Support Network's Buddy System</p>
                <br />

                <p>We'll set you up with your buddy, and you'll both figure out the best time to meet, then you can schedule check-in's to see how things are in your life</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3>Support Team</h3>

                <p>On those days where you need a hand with something, be it sending a email, or just needing a friend, we offer the Support Team</p>
                <p>The support team, is a bunch of leftists that volunteer their time to help comrades in need, whatever the situation.</p>
                <p>Volunteers are trained in compasion, listening, and esculating to admins incase things get beyond their scope.</p>
                <p>So, whether you're in need of a good vent session, or need an escape from the ever-loving void, let us know, and we'll see what we can do</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3>Mutual Aid Contacting</h3>

                <p>This project involves viturally contacting other Leftist orginizations and building networks of community support</p>
                <p>For example, why aren't the farmers talking to the foodbanks, and why aren't mutual aid groups all talking to each other, sharing resources, knowledge and leftist ideology?</p>

                <p>Mutual Aid Contacting aims to fix these problems. Check out our Resources tab to see the list of orginizations we plan on contacting.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </>
    );
  }
}
