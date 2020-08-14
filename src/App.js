import React from "react";
import { Grid } from "@material-ui/core";
import { SearchBar, VideoDetails, VideoList } from "./components";

import youtube from "./api/youtube";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideos: null,
  };

  componentDidMount() {
    this.handleSubmit("Sauti Sol");
  }
  handleSubmit = async (searchTerm) => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyCq5UT2K-PSyANUbv2R2pF-ymfFhNah8as",
        q: searchTerm,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideos: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({
      selectedVideos: video,
    });
  };
  render() {
    const { selectedVideos, videos } = this.state;
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetails video={selectedVideos} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
