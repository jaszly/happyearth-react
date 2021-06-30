import React from "react";
import { withRouter } from "react-router-dom";
// import Map from "./Map.jsx";
// import NavSpots from "./Nav-Spots.jsx";
import TopNav from "./Nav-Top.jsx";
import axios from "axios";
import "../styles/spot.css";
import "../styles/buttons.css";
import "../styles/cards.css";
import "../styles/forms.css";
import "../styles/gallery.css";
import "../styles/grid.css";
import "../styles/icons.css";
import "../styles/sidebar.css";
import "../styles/users.css";
// import "../styles/universal.css";
import "../styles/grid.css";
import { Button, Container, Row, Col, Carousel } from "react-bootstrap";

class Spot extends React.Component {
  state = {
    spot: {
      liked: false,
      selectedImage: "",
      images: [],
      title: "",
      spotters: {
        name: "",
        avatar: "",
      },
      features: [],
      description: "",
      spotTypes: {
        name: "",
        categoryname: "",
      },
      eatins: [],
      takeaways: [],
      city: "",
      country: "",
      center: {
        lat: 9.471077,
        lng: 100.04758,
      },

      toggleEatins: false,
      toggleTakeaways: false,
    },
    spotter: {},
    spotType: {}, //a name for a type...idk
    eatins: [],
    takeaways: [],
    remainingEatins: [],
    remainingTakeaways: [],
  };

  UNSAFE_componentWillMount() {
    let spotId = this.props.match.params.id;
    // let spot = this.state.spot;
    let eatins = this.state.eatins;
    let takeaways = this.state.takeaways;
    axios
      .get(`http://localhost:4000/eatins`)
      .then((res) => {
        eatins = res.data;
        this.setState({ eatins });
        console.log({ eatins });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/takeaways`)
      .then((res) => {
        takeaways = res.data;
        this.setState({ takeaways });
        console.log({ takeaways });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/spots/${spotId}`)
      .then((res) => {
        res.data.selectedImage = res.data.images[0];
        this.setState({ spot: res.data });
        console.log({ spot: res.data });
        this.getRemainingEatins();
        this.getRemainingTakeaways();
        let spotterId = this.state.spot.spotters;
        let spotTypeId = this.state.spot.spotTypes;

        axios
          .get(`http://localhost:4000/users/${spotterId}`)
          .then((user) => {
            console.log({ user: user });
            this.setState({ spotter: user.data });
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:4000/typesall/${spotTypeId}`)
          .then((type) => {
            console.log({ type: type });
            this.setState({ spotType: type.data });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }

  //Main Image
  clickedImage = (image) => {
    let spot = this.state.spot;
    spot.selectedImage = image;
    this.setState({ spot });
  };
  //Like button
  // getClass = () => {
  // 	return this.state.spot.liked
  // 		? 'fas fa-globe-africa'
  // 		: 'fas fa-globe-americas'
  // }

  // toggleLike = () => {
  //   let spot = this.state.spot;
  //   spot.liked = !spot.liked;
  //   this.setState({ spot });
  // };

  getRemainingEatins = () => {
    let remainingEatins = this.state.eatins;
    this.state.spot.eatins.forEach((spotEatin) => {
      remainingEatins = remainingEatins.filter((stateEatin) => {
        return spotEatin._id !== stateEatin._id;
      });
    });
    console.log({ remainingEatins });
    this.setState({ remainingEatins });
  };

  getRemainingTakeaways = () => {
    let remainingTakeaways = this.state.takeaways;
    this.state.spot.takeaways.forEach((spotTakeaway) => {
      remainingTakeaways = remainingTakeaways.filter((stateTakeaway) => {
        return spotTakeaway._id !== stateTakeaway._id;
      });
    });
    console.log({ remainingTakeaways });
    this.setState({ remainingTakeaways });
  };

  render() {
    let styles = {
      selected: {
        color: "#525d5f",
        display: "block",
        position: "relative",
        padding: "0 2vw",
        margin: "1.5vh 3vw",
        cursor: "pointer",
        fontSize: "2.2vh",
        userSelect: "none",
        fontFamily: "Jost",
        textAlign: "left",
      },
    };

    return (
      <>
        <TopNav />

        <div
          style={{
            height: "100%",
            background: "rgb(206,224,224)",
            background:
              "radial-gradient(circle, rgba(206,224,224,1) 15%, rgba(195,221,221,1) 49%, rgba(169,187,173,1) 100%)",
            textAlign: "center",
          }}
        >
          <div className="hero-text ">
            <h1
              style={{
                fontFamily: "Kodchasan",
                fontWeight: "700",
                color: "white",
                fontSize: "70px",
                letterSpacing: "3px",
              }}
            >
              {" ekoh"}
            </h1>
            <Row>
              <Col style={{ margin: "2vh 0vw 0 4vw" }}>
                <Row>
                  <h1
                    style={{
                      color: "white",
                      fontFamily: "Kodchasan",
                      fontSize: "6em",
                      fontWeight: "100",
                      textAlign: "left",
                    }}
                  >
                    {this.state.spot.title}
                  </h1>
                </Row>

                <Row>
                  <h3
                    style={{
                      fontFamily: "Kodchasan",
                      fontSize: "1.5em",
                      color: "white",
                      textAlign: "left",
                    }}
                  ></h3>
                </Row>

                <Row>
                  <h3
                    style={{
                      fontFamily: "Kodchasan",
                      fontSize: "1.5em",
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    {`${this.state.spot.city}, ${this.state.spot.country}`}
                  </h3>
                </Row>
                <Row>
                  <Col
                    className="spotted-by"
                    style={{
                      margin: "-2vh 0 0 -10vw",
                    }}
                  >
                    Spotted by:
                  </Col>
                  <Col>
                    {" "}
                    <div
                      className="avatar"
                      style={{
                        margin: "0 -6vw",
                        backgroundImage: `url(${this.state.spotter.avatar})`,
                      }}
                    ></div>
                    <div
                      className="spotted-by"
                      style={{ margin: "-9vh 0 0 -5vw" }}
                    >
                      {` ${this.state.spotter.firstName} ${this.state.spotter.lastName}`}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <h3
                    style={{
                      fontFamily: "Nunito",
                      fontSize: "1.5em",
                      color: "white",
                      textAlign: "left",
                      margin: "5vh",
                      letterSpacing: "0.1em",
                      lineHeight: "2.2em",
                    }}
                  >
                    {this.state.spot.description}
                  </h3>
                </Row>
              </Col>
              <Col>
                <div className="grid two gallery">
                  <div>
                    <div
                      className="image-main"
                      style={{
                        backgroundImage: `url('${this.state.spot.selectedImage}')`,
                        border: "3px solid white",
                      }}
                    ></div>
                    <div className="thumbnails">
                      {this.state.spot.images.map((image, index) => {
                        return (
                          <div
                            className="thumbnail"
                            style={{
                              backgroundImage: `url(${image})`,
                            }}
                            key={index}
                            onClick={() => this.clickedImage(image)}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <div>
                          {this.state.spot.toggleEatins ? (
                            <div>
                              <div className="eatinfont">Dine In Features</div>
                              {this.state.remainingEatins.map((eatin) => {
                                return (
                                  <div style={styles.selected} key={eatin._id}>
                                    <li>{`${eatin.explanation}`}</li>
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col style={{ border: "1px solid black" }}>
                    test here{" "}
                    <Row>
                      <Col>
                        <div>
                          {this.state.spot.toggleTakeaways ? (
                            <div>
                              <div className="eatinfont">Business Features</div>
                              {this.state.spot.takeaways.map((takeaway) => {
                                return (
                                  <div
                                    className="amenityfontbold"
                                    key={takeaway._id}
                                  >
                                    <li>
                                      <i className={takeaway.icon}> </i>
                                      {takeaway.explanation}
                                    </li>
                                  </div>
                                );
                              })}

                              {this.state.remainingTakeaways.map((takeaway) => {
                                return (
                                  <div
                                    className="amenityfont"
                                    style={styles.selected}
                                    key={takeaway._id}
                                  >
                                    <li>
                                      <i className={takeaway.icon}> </i>
                                      {` ${takeaway.explanation}`}
                                    </li>
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>{" "}
                      </Col>
                      <Col>Right Col</Col>
                    </Row>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </Col>

              <Col style={{ border: "1px solid black" }}>imagesss here</Col>
            </Row>
          </div>
        </div>

        <Container fluid>
          <Row>
            <div className="spot-title">{this.state.spot.title}</div>{" "}
            <Row
              style={{
                margin: "5vh 3vw 3vh 5vw",
              }}
            >
              <div className="spot-description">
                <div>{this.state.spot.description}</div>
              </div>
            </Row>
            <Row style={{ margin: "10vh 3vw 3vh 5vw" }}>
              <small>Features:</small>

              <div>
                {this.state.spot.toggleTakeaways ? (
                  <div>
                    <div className="eatinfont">test</div>
                    {this.state.spot.takeaways.map((takeaway) => {
                      return (
                        <div className="amenityfontbold" key={takeaway._id}>
                          <li>
                            <i className={takeaway.icon}> </i>
                            {takeaway.explanation}
                          </li>
                        </div>
                      );
                    })}
                    {this.state.remainingTakeaways.map((takeaway) => {
                      return (
                        <div
                          className="amenityfont"
                          style={styles.selected}
                          key={takeaway._id}
                        >
                          <li>
                            <i className={takeaway.icon}> </i>
                            {` BYO  ${takeaway.explanation}`}
                          </li>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </Row>
            <Row style={{ margin: "10vh 3vw 3vh 5vw" }}>Price: $ $ $ </Row>
            <Row style={{ margin: "10vh 3vw 3vh 5vw" }}>
              Happy Earth Score:
              <i className="fas fa-globe-africa"></i>{" "}
              <i className="fas fa-globe-africa"></i>{" "}
              <i className="fas fa-globe-africa"></i>
            </Row>
            <Col>
              <div className="grid two gallery">
                <div>
                  <div
                    className="image-main"
                    style={{
                      backgroundImage: `url('${this.state.spot.selectedImage}')`,
                    }}
                  ></div>
                  <div className="thumbnails">
                    {this.state.spot.images.map((image, index) => {
                      return (
                        <div
                          className="thumbnail"
                          style={{
                            backgroundImage: `url(${image})`,
                          }}
                          key={index}
                          onClick={() => this.clickedImage(image)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Row style={{ border: "2px solid black" }}>Map</Row>
              <Row>
                <Col style={{ border: "2px solid black" }}>Location</Col>
                <Col style={{ border: "2px solid black" }}>Hours</Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container style={{ marginTop: "350px" }}>
          <Row>
            <Col>
              <div className="spot-title">{this.state.spot.title}</div>
              <small>
                {this.state.spot.types ? (
                  <div className="type-font">{this.state.spot.types.name}</div>
                ) : null}
              </small>
            </Col>
          </Row>

          <Row>
            <Col className="gallery">
              <Carousel>
                {this.state.spot.images.map((image, index) => {
                  return (
                    <Carousel.Item>
                      <div
                        className="gallery-img"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                        key={index}
                        onClick={() => this.clickedImage(image)}
                      ></div>
                    </Carousel.Item>
                  );
                })}
                <Carousel.Caption> </Carousel.Caption>
              </Carousel>
              <div>
                {this.state.spot.images.map((image, index) => {
                  return (
                    <div
                      className="thumbnail-img"
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                      key={index}
                      onClick={() => this.clickedImage(image)}
                    ></div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Spot);
