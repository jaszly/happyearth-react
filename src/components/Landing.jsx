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
                  fontFamily: "Pacifico",
                  color: "white",
                  fontSize: "150px",
                  letterSpacing: "3px",
                  marginBottom: "50px",
                }}
              >
                {" happy earth"}
              </h1>
            </div>
            <h2 class="secondary">
              Crowd-sourced reviews of your city's most eco-friendly and
              sustainable restaurants, shops and cafes.
            </h2>

            <div
              className="center-search"
              style={{ border: "1px solid rgb(213, 213, 213)" }}
            >
              <i className="fas fa-search-location search-icon"></i>
              <input
                className="center-searchBox"
                type="text"
                placeholder="Browse by city"
                onChange={this.search}
                style={{
                  boxShadow: "none",
                  fontFamily: "Jost",
                  fontSize: "22px",
                  letterSpacing: "3px",
                  color: "black",
                  padding: "5px",
                }}
              ></input>
            </div>
            <div className="search-panel">
              {/*
						1. insert dropdown with results
						2. each option has onClick={this.selectOption}
						*/}
              <div className={this.dropdownStatus()}>
                {this.state.options.map((option) => {
                  return (
                    <div
                      className="option"
                      onClick={this.selectOption}
                      id={option}
                    >
                      <i class="fas fa-map-marker-alt"></i>
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Container style={{ margin: "30vh 45vw" }}>
          <Row></Row>
        </Container>
        <div>
          <div>
            <h2 className="secondary" style={{ color: "black" }}>
              Browse Happy Earth's Top Reviewed Cities:
            </h2>{" "}
            <Card
              style={{
                // width: "10vw",
                height: "40vh",
                background: "#FFFFFF",
                border: "1px solid #E0E0E0",
                borderRadius: "30px",
                margin: "30px 100px",
              }}
            >
              <Card.Img
                style={{
                  padding: "20px 20px 0px 20px",
                  borderRadius: "4px",
                  marginBottom: "0px",
                }}
                variant="top"
                src="https://source.unsplash.com/tPf-9_uMIeU"
              />
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
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
