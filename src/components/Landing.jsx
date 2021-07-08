import React from "react";
// import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import "../styles/landing.css";
import TopNav from "./Nav-Top.jsx";
// import Spots from "./Spots.jsx";

import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

class Landing extends React.Component {
  state = {
    options: [],
    open: false,
  };

  search = (e) => {
    axios
      .get(`http://localhost:4000/cities?name=${e.target.value}`)
      .then((res) => {
        console.log({ res });
        // if length, set state options
        // else set state options = "Not found"
        if (res.data[0]) {
          console.log("res.data", res.data);
          this.setState({ options: res.data });
        } else {
          this.setState({
            options: ["Not available"],
          });
        }
      })
      .catch((err) => {
        console.log("errorr >>>", { err });
        // else set state options = "Not found"
      });
    this.setState({ open: true });
  };

  selectOption = (e) => {
    this.props.history.push(`/spots?city=${e.target.id}`);
  };
  dropdownStatus = () => {
    if (this.state.open) {
      return "dropdown open";
    } else {
      return "dropdown";
    }
  };

  componentWillMount() {
    console.log("this.state.options", this.state.options);
  }

  render() {
    return (
      <>
        <div className="bg-img ">
          <TopNav />

          <div className="hero-text ">
            <div
              style={{
                marginTop: "0px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Kodchasan",
                  color: "#E9E5DC",
                  fontSize: "150px",
                  fontWeight: "200",
                  letterSpacing: "3px",
                  marginBottom: "50px",
                }}
              >
                {" ekoh"}
              </h1>
            </div>
            <h2 className="secondary" style={{ color: "#E9E5DC" }}>
              Find eco-friendly and sustainable restaurants, shops and
              businesses.
            </h2>

            <div
              className="center-search"
              style={{ border: "1px solid rgb(213, 213, 213)" }}
            >
              <i className="fas fa-search-location search-icon"></i>
              <input
                className="center-searchBox"
                type="text"
                placeholder="Start by typing a city"
                onChange={this.search}
                style={{
                  boxShadow: "none",
                  fontFamily: "Kodchasan",
                  fontSize: "22px",
                  letterSpacing: "3px",
                  color: "white",
                  padding: "5px",
                }}
              ></input>
            </div>
            <div className="search-panel">
              {/*
						1. insert dropdown with results
						2. each option has onClick={this.selectOption}
						*/}
              <div
                className={this.dropdownStatus()}
                style={{
                  backgroundColor: "#9aa07e",
                  border: "1px solid #e9ecef",
                  borderTop: "none",
                  margin: "-6vw 2vw 0 1vw",
                }}
              >
                {this.state.options.map((option) => {
                  return (
                    <div
                      className="option"
                      onClick={this.selectOption}
                      id={option}
                      style={{
                        color: "white",
                        fontFamily: "Kodchasan",
                        padding: "2vh 2vw",
                        margin: "2vh 2vw",
                        fontSize: "1.4em",
                      }}
                    >
                      <i
                        class="fas fa-map-marker-alt"
                        style={{ color: "white" }}
                      ></i>
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#E9E5DC" }}>
          <div>
            <h2
              className="secondary"
              style={{
                color: "#9aa07e",
                textAlign: "center",
                paddingTop: "10vh",
              }}
            >
              Shop Better. Dine Better. Support Sustainability.{" "}
            </h2>
            <Container>
              <h3 className="thirdly">sustainable shopping</h3>

              <Row style={{ paddingBottom: "40vh" }}>
                <Col>
                  <Card className="landing-pg-cards">
                    <Card.Body>
                      <Card.Title style={{ marginTop: "10px" }}></Card.Title>
                      <Card.Img src="https://s.hdnux.com/photos/40/00/33/8390340/9/rawImage.jpg" />
                      <h4>Shopping Bulk: </h4>
                      <h5>
                        Discover where to start or enhance your zero waste
                        journey
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card
                    style={{
                      // width: "10vw",
                      // height: "10vh",
                      background: "#FFFFFF",
                      border: "1px solid #E0E0E0",
                      borderRadius: "30px",
                    }}
                  >
                    <Card.Body>
                      <Button
                        variant="link"
                        style={{
                          height: "30px",
                          borderRadius: "12px",
                          borderColor: "#000",
                          marginLeft: "1px",
                          padding: "0 3px 3px 0",
                        }}
                      >
                        $type of spot{" "}
                      </Button>
                      <Card.Title style={{ marginTop: "10px" }}></Card.Title>
                      <Card.Img src="https://s.hdnux.com/photos/40/00/33/8390340/9/rawImage.jpg" />
                      <h4> Top Rated Secondhand Shops </h4>
                      <h5> Around the world</h5>
                    </Card.Body>
                  </Card>{" "}
                </Col>
                <Col>
                  <Card
                    style={{
                      // width: "10vw",
                      // height: "10vh",
                      background: "#FFFFFF",
                      border: "1px solid #E0E0E0",
                      borderRadius: "30px",
                    }}
                  >
                    <Card.Body>
                      <Button
                        variant="link"
                        style={{
                          height: "30px",
                          borderRadius: "12px",
                          borderColor: "#000",
                          marginLeft: "1px",
                        }}
                      >
                        $type of spot{" "}
                      </Button>
                      <Card.Title style={{ marginTop: "10px" }}></Card.Title>
                    </Card.Body>
                  </Card>{" "}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
