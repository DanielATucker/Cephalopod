import React, { Component } from "react";

import "./MusicPlayer.css";

export class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioContext: null,
      audioSource: null,
      analyser: null,
      ctx: null,
    };

    this.playPause = this.playPause.bind(this);
  }

  playPause(event) {
    console.log(`Event: ${event}`);

    const canvas = document.getElementById(`canvas`);

    const ctx = canvas.getContext(`2d`);

    let audioContext = new AudioContext();

    let audio1 = new Audio("https://localhost:3001/vidChunk?id=failed_state");

    let audioSource = audioContext.createMediaElementSource(audio1);

    let analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);

    analyser.connect(audioContext.destination);

    analyser.fftSize = 64;

    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    const barWidth = document.getElementById(`canvas`).width / bufferLength;
    let barHeight;
    let x = 0;

    function animate() {
      x = 0;

      ctx.clearRect(
        0,
        0,
        document.getElementById(`canvas`).width,
        document.getElementById(`canvas`).height
      );

      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = `white`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">Revolutionary Music</h4>
              </div>

              <div className="row">
                <div className="col-md-7 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <p>Music Player</p>

                      <div>
                        <div className="row">
                          <div className="col-md-7 stretch-card">
                            <div className="card">
                              <div className="card-body">
                                <canvas id="canvas"> </canvas>
                              </div>
                            </div>
                          </div>
                        </div>

                        <audio
                        id="audio1"
                        controls
                        src="https://localhost:3001/music/vidChunk?id=failed_state"
                        //onPlay={this.playPause}
                        >
                        {" "}
                        </audio>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
