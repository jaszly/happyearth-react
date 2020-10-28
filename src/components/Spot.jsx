import React from "react";
import { withRouter } from "react-router-dom";
import Map from "./Map.jsx";
import NavSpots from "./Nav-Spots.jsx";
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
      description: "",
      types: {},
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
    eatins: [],
    takeaways: [],
    remainingEatins: [],
    remainingTakeaways: [],
  };

  UNSAFE_componentWillMount() {
    let spotId = this.props.match.params.id;
    let spot = this.state.spot;
    let eatins = this.state.eatins;
    let takeaways = this.state.takeaways;
    axios
      .get(`${process.env.REACT_APP_API}/eatins`)
      .then((res) => {
        eatins = res.data;
        this.setState({ eatins });
        console.log({ eatins });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_API}/takeaways`)
      .then((res) => {
        takeaways = res.data;
        this.setState({ takeaways });
        console.log({ takeaways });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_API}/spots/${spotId}`)
      .then((res) => {
        res.data.selectedImage = res.data.images[0];
        this.setState({ spot: res.data });
        console.log({ spot: res.data });
        this.getRemainingEatins();
        this.getRemainingTakeaways();
        let spotterId = this.state.spot.spotters;
        axios
          .get(`${process.env.REACT_APP_API}/users/${spotterId}`)
          .then((user) => {
            console.log({ user: user });
            this.setState({ spotter: user.data });
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

  toggleLike = () => {
    let spot = this.state.spot;
    spot.liked = !spot.liked;
    this.setState({ spot });
  };

  getRemainingEatins = () => {
    let remainingEatins = this.state.eatins;
    this.state.spot.eatins.forEach((spotEatin) => {
      remainingEatins = remainingEatins.filter((stateEatin) => {
        return spotEatin._id != stateEatin._id;
      });
    });
    console.log({ remainingEatins });
    this.setState({ remainingEatins });
  };

  getRemainingTakeaways = () => {
    let remainingTakeaways = this.state.takeaways;
    this.state.spot.takeaways.forEach((spotTakeaway) => {
      remainingTakeaways = remainingTakeaways.filter((stateTakeaway) => {
        return spotTakeaway._id != stateTakeaway._id;
      });
    });
    console.log({ remainingTakeaways });
    this.setState({ remainingTakeaways });
  };

  render() {
    let styles = {
      selected: {
        color: "#27965c",
      },
    };

    return (
      <>
        <Row className="bg-img" style={{ height: "10%" }}>
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
                  fontSize: "120px",
                  letterSpacing: "3px",
                  margin: "0px 0px 15vh 30vw",
                }}
              >
                {" happy earth"}
              </h1>
            </div>
          </div>
        </Row>
        <Container fluid>
          <Row>
            <Col style={{ backgroundColor: "#6a7553" }}>
              <div className="spot-title">{this.state.spot.title}</div>

              <div
                style={{
                  margin: "-8vh 0 0 5vw",
                }}
              >
                <Row className="spotted-by">{"Spotted by:"}</Row>
                <Row>
                  <Col xs lg="2">
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: `url(${this.state.spotter.avatar})`,
                      }}
                    ></div>
                  </Col>
                  <Col className="spotted-byuser" xs lg="2">
                    {" "}
                    {` ${this.state.spotter.firstName} ${this.state.spotter.lastName}`}
                  </Col>
                </Row>
              </div>

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
                <small> Features:</small>{" "}
                <Button
                  variant="light"
                  size="sm"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #eeeeef",
                    borderRadius: "14px",
                    width: "30%",
                    fontSize: "12px",
                  }}
                >
                  Plastic Free{" "}
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #eeeeef",
                    borderRadius: "14px",
                    width: "40%",
                    fontSize: "12px",
                  }}
                >
                  Vegetarian/Vegan
                </Button>
              </Row>
              <Row style={{ margin: "10vh 3vw 3vh 5vw" }}>Price: $ $ $ </Row>
              <Row style={{ margin: "10vh 3vw 3vh 5vw" }}>
                Happy Earth Score:
                <i class="fas fa-globe-africa"></i>{" "}
                <i class="fas fa-globe-africa"></i>{" "}
                <i class="fas fa-globe-africa"></i>
              </Row>
            </Col>
            <Col style={{ backgroundColor: "#9aa07e" }}>
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
            </Col>
          </Row>

          <Row>
            <Col style={{ border: "2px solid black" }}>Map</Col>
            <Col style={{ border: "2px solid black" }}>Location & Hours</Col>
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
                <Carousel.Caption>
                  {" "}
                  <div>{this.state.spot.types.name}</div>
                </Carousel.Caption>
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

            <Col>
              <Row style={{ border: "2px solid black" }}>Map Here</Row>
              <Row>
                <Col style={{ border: "2px solid black" }}>Location</Col>
                <Col style={{ border: "2px solid black" }}>Hours</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col style={{ border: "2px solid black" }}>
              {" "}
              <div>
                {this.state.spot.toggleEatins ? (
                  <div>
                    <div className="eatinfont">Features</div>
                    {this.state.spot.eatins.map((eatin) => {
                      return (
                        <div className="amenityfontbold" key={eatin._id}>
                          <li>
                            <i className={eatin.icon}> </i>
                            {eatin.explanation}
                          </li>
                        </div>
                      );
                    })}
                    {this.state.remainingEatins.map((eatin) => {
                      return (
                        <div
                          className="amenityfont"
                          style={styles.selected}
                          key={eatin._id}
                        >
                          <li>
                            <i className={eatin.icon}> </i>
                            {` Bring Your Own   ${eatin.explanation}`}
                          </li>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </Col>
            <Col style={{ border: "2px solid black" }}>
              <div>
                {this.state.spot.toggleTakeaways ? (
                  <div>
                    <div className="eatinfont">Business Features</div>
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
                            {` Bring Your Own   ${takeaway.explanation}`}
                          </li>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>{" "}
            </Col>
          </Row>
          <Row style={{ border: "2px solid black" }}>
            {" "}
            <div>
              <div className="aboutspotfont">About this Spot</div>
              <div className="descriptionfont">
                {this.state.spot.description}
              </div>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Spot);
