import React from "react";
import axios from "axios";
import TopNav from "./Nav-Top.jsx";
import Filters from "./Filters.jsx";
import Cards from "./Cards.jsx";
import Map from "./Map.jsx";
// import Pin from "./Pin.jsx";
import "../styles/grid.css";
import "../styles/googlemap.css";

import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Spots extends React.Component {
  state = {
    array: true,
    spots: [
      {
        images: [],
        types: {},
        center: {},
      },
    ],
    spotsClone: [],
    center: {},
  };

  updateSearchField = (e) => {
    console.log("searchfield", e.target.value);
    if (e.target.value === "") {
      let spots = this.state.spots;
      spots = this.state.spotsClone;
      this.setState({ spots });
      console.log("empty search field", spots);
    } else {
      let filteredSpots = this.state.spotsClone.filter((spot) => {
        return spot.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      this.setState({ spots: filteredSpots });
    }
  };

  filterByType = (e) => {
    console.log("this.state.spots", this.state.spots);
    let selected = e.target.value;
    console.log("the target search >>>", e.target.value);
    let spotsClone = this.state.spotsClone;
    let spotsFound;
    if (selected !== "All" || selected !== "Any") {
      spotsFound = spotsClone.filter((s) => s.types.name === selected);
    } else {
      spotsFound = spotsClone;
    }
    this.setState({ spots: spotsFound });
  };

  // UNSAFE_componentWillMount() {
  componentDidMount() {
    let spot = this.state.spot;
    let spots = this.state.spots;
    let cityName = this.props.location.search.split("=")[1];
    axios
      .get(`http://localhost:4000/spots?city=${cityName}`)
      .then((res) => {
        // spot.center.lat = res.data[0].center.lat;
        // spot.center.lng = res.data[0].center.lng;
        // ********* DELETE UNTIL GOOGLE MAP API IS FIXED**********
        // console.log("res.data[0].center.lat", res.data[0].center.lat);
        // console.log("res.data[0].center.lng", res.data[0].center.lng);
        // console.log(res.data);

        this.setState({
          spots: res.data,
          spotsClone: res.data,
          center: res.data[0].center,
        });
        console.log("THESE ARE THE SPOTS >> ", res.data);
      })
      .catch((error) => {
        console.log({ error });
      });

    axios
      .get(`http://localhost:4000/spots?city=${cityName}`)
      .then((res) => {
        spots = res.data;
        this.setState({ spots });
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  render() {
    return (
      <div>
        <Row className="header-img">
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
                  fontSize: "120px",
                  letterSpacing: "3px",
                  margin: "0px 0px 20vh 30vw",
                }}
              >
                {" happy earth"}
              </h1>
            </div>
          </div>
        </Row>
        <Container>
          <Row>
            <Col className="sidebar">
              <Filters
                updateSearchField={this.updateSearchField}
                filterByType={this.filterByType}
              />
            </Col>
            <Col xs={6}>
              <div className="grid twocards">
                {this.state.spots.map((spot) => (
                  <Cards spot={spot} key={spot._id} />
                ))}
              </div>
            </Col>
            <Col>
              <div className="google-map">
                <Map spots={this.state.spots} center={this.state.center} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Spots);
