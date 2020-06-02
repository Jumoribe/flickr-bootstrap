import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Card, Navbar } from "react-bootstrap";

export default class App extends React.Component {
  state = {
    items: []
  };
  componentDidMount() {
    var _this = this;
    this.serverRequest = axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=ca3783111609d69139840916b7a01ad2&format=json&nojsoncallback=1&per_page=6"
      )
      .then(function(result) {
        _this.setState({
          items: result.data.photos.photo,
          selectedImage: _this.imageURL(result.data.photos.photo[0])
        });
      });
  }
  imageURL(item) {
    return (
      "http://farm" +
      item.farm +
      ".staticflickr.com/" +
      item.server +
      "/" +
      item.id +
      "_" +
      item.secret +
      ".jpg"
    );
  }

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#752eb0" }}>
          <Navbar.Brand href="#home" style={{ color: "#ffffff" }}>
            Flickr API Component
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style={{ color: "#ffffff" }}>
              Made by Juliana Moribe
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ width: "80%", margin: "auto" }}>
          <div class="row" style={{ marginTop: "2em" }}>
            {this.state.items ? (
              this.state.items.map((item, index) => {
                return (
                  <Card class="col-1" style={{ margin: "2em" }}>
                    <Card.Img
                      style={{ height: "180px", maxWidth: "300px" }}
                      src={this.imageURL(item)}
                    />
                    <Card.Body style={{ backgroundColor: "#752eb0" }}>
                      <Card.Title style={{ color: "#ffffff" }}>
                        Picture {index + 1}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px"
                }}
              >
                loading...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
