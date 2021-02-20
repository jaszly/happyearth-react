import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  ProgressBar,
} from "react-bootstrap";
import "../../styles/forms.css";
import "../../styles/buttons.css";
class CreateFoodDrink extends React.Component {
  state = {
    user: {},
    category: {},
    spot: {
      title: "",
      files: [],
      images: [],
      types: [],
      eatins: [],
      takeaways: [],
      diets: [],
      ethics: [],
      lat: "",
      lng: "",
      toggleEatins: false,
      toggleTakeaways: false,
      toggleDiets: false,
      toggleEthics: false,
    },
    eatins: [],
    takeaways: [],
    diets: [],
    ethics: [],
    types: [],
  };

  UNSAFE_componentWillMount() {
    let categoryId = this.props.match.params.id;
    let types = this.state.types;
    let eatins = this.state.eatins;
    let takeaways = this.state.takeaways;
    let diets = this.state.diets;
    let ethics = this.state.ethics;

    axios
      .get(`http://localhost:4000/create/${categoryId}`)
      .then((res) => {
        this.setState({ category: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/typesfood`)
      .then((res) => {
        types = res.data;
        this.setState({ types });
      })
      .catch((err) => {
        console.log({ err });
      });
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
      .get(`http://localhost:4000/diets`)
      .then((res) => {
        diets = res.data;
        this.setState({ diets });
        console.log({ diets });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/ethics`)
      .then((res) => {
        ethics = res.data;
        this.setState({ ethics });
        console.log({ ethics });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    let spot = this.state.spot;
    if (!localStorage.getItem("token")) {
      sessionStorage.setItem("path", "/create");
      this.props.history.push("/Signup");
    } else {
      axios
        .get(`http://localhost:4000/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((user) => {
          this.setState({ user: user.data });
          this.state.spot.spotters = this.state.user._id;
          this.state.spot.types = this.state.types[0]._id;
          this.setState({ spot });
        })
        .catch((err) => console.log(err));
    }
  }

  //setState with input
  changeField = (e, field) => {
    let spot = this.state.spot;
    spot[field] = e.target.value;
    this.setState({ spot });
  };

  //toggle eatins
  toggleEatin = (e) => {
    let spot = this.state.spot;
    spot.toggleEatins = !spot.toggleEatins;
    this.setState({ spot });
  };

  //toggle takeaways
  toggleTakeaway = (e) => {
    let spot = this.state.spot;
    spot.toggleTakeaways = !spot.toggleTakeaways;
    this.setState({ spot });
  };

  // toggle diets
  toggleDiet = (e) => {
    let spot = this.state.spot;
    spot.toggleDiets = !spot.toggleDiets;
    this.setState({ spot });
  };

  // toggle ethics
  toggleEthic = (e) => {
    let spot = this.state.spot;
    spot.toggleEthics = !spot.toggleEthics;
    this.setState({ spot });
  };

  //select takeaways
  checkBox = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let takeaways = spot.takeaways;

    if (spot.takeaways.find((takeaway) => takeaway === _id)) {
      spot.takeaways = spot.takeaways.filter((takeaway) => takeaway !== _id);
    } else {
      spot.takeaways.push(_id);
      if (spot.takeaways) this.setState({ spot: spot.takeaways });
    }
    this.setState({ spot });
  };

  //select eatins
  checkBox2 = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let eatins = spot.eatins;

    if (spot.eatins.find((eatin) => eatin === _id)) {
      spot.eatins = spot.eatins.filter((eatin) => eatin !== _id);
    } else {
      spot.eatins.push(_id);
      this.setState({ spot: spot.eatins });
    }
    this.setState({ spot });
  };

  //select diets
  checkBox3 = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let eatins = spot.diets;
    if (spot.diets.find((diet) => diet === _id)) {
      spot.diets = spot.diets.filter((diet) => diet !== _id);
    } else {
      spot.diets.push(_id);
      this.setState({ spot: spot.diets });
    }
    this.setState({ spot });
  };

  //select ethics
  checkBox4 = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;

    if (spot.ethics.find((ethic) => ethic === _id)) {
      spot.ethics = spot.ethics.filter((ethic) => ethic !== _id);
    } else {
      spot.ethics.push(_id);
      this.setState({ spot: spot.ethics });
    }
    this.setState({ spot });
  };

  //upload files
  getFile = (e) => {
    let spot = this.state.spot;
    spot.files = e.target.files;
    this.setState({ spot }, () => {
      console.log("state", this.state);
    });
  };

  //button create place and upload files via cloudinary
  createPlace = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in this.state.spot) {
      if (
        (typeof this.state.spot[key] == "object" && key === "eatins") ||
        key === "takeaways" ||
        key === "diets" ||
        key === "ethics"
      ) {
        this.state.spot[key].forEach((val) => {
          data.append(`${key}[]`, val);
        });
      } else if (typeof this.state.spot[key] == "object" && key === "files") {
        for (let i = 0; i < this.state.spot[key].length; i++) {
          data.append(key, this.state.spot[key][i]);
        }
      } else {
        data.append(key, this.state.spot[key]);
      }
    }
    console.log({ data });
    axios
      .post(`http://localhost:4000/spots`, data)
      .then((res) => {
        let spotId = res.data.spot._id;
        this.props.history.push(`/spots/${spotId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div style={{ height: "250vh", backgroundColor: "#96ad9c" }}>
        <Container style={{ padding: "15vh 15vw" }}>
          <h1
            className="accent-co"
            style={{
              fontSize: "45px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "5vh",
            }}
          >
            {" add a spot to ekoh"}
          </h1>

          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  className="form-boxes form-sm"
                  size="sm"
                  type="text"
                  onChange={(e) => this.changeField(e, "title")}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Subcategory </Form.Label>
                <Form.Control
                  className="form-boxes form-sm"
                  size="sm"
                  as="select"
                  onChange={(e) => this.changeField(e, "subcategory")}
                >
                  {this.state.types.map((type) => {
                    return <option value={type._id}>{type.name}</option>;
                  })}
                  >
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Description </Form.Label>
                <Form.Control
                  className="form-boxes form-lrg"
                  as="textarea"
                  type="text"
                  rows={6}
                  onChange={(e) => this.changeField(e, "description")}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="country"
                  className="countries order-alpha form-boxes form-sm"
                  id="countryId"
                  style={{ height: "3.5em" }}
                  size="sm"
                  as="select"
                  onChange={(e) => this.changeField(e, "country")}
                >
                  <option value="">Select Country</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  name="state"
                  className="states order-alpha form-boxes form-sm"
                  id="stateId"
                  style={{ height: "3.5em" }}
                  size="sm"
                  as="select"
                  onChange={(e) => this.changeField(e, "region")}
                >
                  <option value="">Select Region or State</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  className="states order-alpha form-boxes form-sm"
                  id="cityId"
                  size="sm"
                  as="select"
                  onChange={(e) => this.changeField(e, "city")}
                >
                  <option value="">Select City</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col xs={8}>
                <Form.Group controlId="formGridNighborhood">
                  <Form.Label>District/Neigborhood (Optional)</Form.Label>
                  <Form.Control
                    className="form-boxes form-sm"
                    type="text"
                    placeholder="Ex: CBD, Chinatown, Mission District, Lamai Beach"
                  />
                </Form.Group>
              </Col>
              <Col xs lg="2">
                <Form.Group controlId="formGridLat">
                  <Form.Label className="labelfont">Latitude</Form.Label>
                  <Form.Control
                    className="form-boxes form-sm"
                    type="number"
                    value={this.state.spot.lat}
                    onChange={(e) => this.changeField(e, "lat")}
                    style={{ height: "3.5em" }}
                  />
                </Form.Group>
              </Col>
              <Col xs lg="2">
                <Form.Group controlId="formGridLng" className="col-xs-2">
                  <Form.Label className="labelfont">Longitude</Form.Label>
                  <Form.Control
                    className="form-boxes form-sm"
                    type="number"
                    value={this.state.spot.lng}
                    onChange={(e) => this.changeField(e, "lng")}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Col
              style={{
                border: "1px dotted #d2ecf1",
                borderRadius: "2em",
                padding: "2.5em 12em 1.5em",
              }}
            >
              <Row>
                {" "}
                <div className="upload-btn-wrapper">
                  <button className="upld-btn">
                    <i
                      style={{ color: "#fff", fontSize: "1.5em" }}
                      className="far fa-image"
                    ></i>
                  </button>
                  <input type="file" onChange={this.getFile} multiple />
                </div>
              </Row>
              <Row style={{ margin: "1em 4em 0" }}>
                <Form.Label className="labelfont">Upload Photos</Form.Label>
              </Row>
            </Col>

            <h1
              className="form-txt"
              style={{
                fontSize: "1em",
                letterSpacing: "1em",
                margin: "6vh 0 2vh",
                textTransform: "uppercase",
              }}
            >
              {"Add features:"}
            </h1>

            <Form.Row style={{ marginTop: "5vh" }}>
              <Form.Group as={Col}>
                <Button
                  as="Link"
                  className="features-buttons"
                  onClick={(e) => this.toggleTakeaway(e)}
                >
                  <span
                    className="fb-txt spotted-byuser"
                    style={{ color: "#fff" }}
                  >
                    {"Take Away"}
                  </span>
                </Button>
                <li style={{ textDecoration: "none", margin: "3vh" }}>
                  {this.state.spot.toggleTakeaways
                    ? this.state.takeaways.map((takeaway) => {
                        return (
                          <Form.Label
                            className="checkbox-container"
                            style={{ padding: "0 2vw", fontSize: "16px" }}
                          >
                            {takeaway.explanation}
                            <input
                              style={{
                                position: "absolute",
                                opacity: "0",
                                cursor: "pointer",
                                height: "0",
                                width: "0",
                              }}
                              type="checkbox"
                              value={takeaway._id}
                              onChange={(e) => this.checkBox(e)}
                            />
                            <span className="checkmark"></span>
                          </Form.Label>
                        );
                      })
                    : null}
                </li>
              </Form.Group>

              <Form.Group as={Col}>
                <Button
                  as="Link"
                  className="features-buttons"
                  onClick={(e) => this.toggleEatin(e)}
                >
                  <span
                    className="fb-txt spotted-byuser"
                    style={{ color: "#fff" }}
                  >
                    {"Dine In"}
                  </span>
                </Button>
                <li style={{ textDecoration: "none", margin: "3vh" }}>
                  {this.state.spot.toggleEatins
                    ? this.state.eatins.map((eatin) => {
                        return (
                          <Form.Label
                            className="checkbox-container"
                            style={{ padding: "0 2vw", fontSize: "16px" }}
                          >
                            {eatin.explanation}
                            <input
                              style={{
                                position: "absolute",
                                opacity: "0",
                                cursor: "pointer",
                                height: "0",
                                width: "0",
                              }}
                              type="checkbox"
                              value={eatin._id}
                              onChange={(e) => this.checkBox2(e)}
                            />
                            <span className="checkmark"></span>
                          </Form.Label>
                        );
                      })
                    : null}
                </li>
              </Form.Group>

              <Form.Group as={Col}>
                <Button
                  as="Link"
                  className="features-buttons"
                  onClick={(e) => this.toggleDiet(e)}
                >
                  <span
                    className="fb-txt spotted-byuser"
                    style={{ color: "#fff" }}
                  >
                    {"Diet Options"}
                  </span>
                </Button>

                <li style={{ textDecoration: "none" }}>
                  {this.state.spot.toggleDiets
                    ? this.state.diets.map((diet) => {
                        return (
                          <Form.Label
                            className="checkbox-container"
                            style={{ padding: "0 2vw", fontSize: "16px" }}
                          >
                            {diet.name}
                            <input
                              style={{
                                position: "absolute",
                                opacity: "0",
                                cursor: "pointer",
                                height: "0",
                                width: "0",
                              }}
                              type="checkbox"
                              value={diet._id}
                              onChange={(e) => this.checkBox3(e)}
                            />
                            <span className="checkmark"></span>
                          </Form.Label>
                        );
                      })
                    : null}
                </li>
              </Form.Group>

              <Form.Group as={Col}>
                <Button
                  as="Link"
                  className="features-buttons"
                  onClick={(e) => this.toggleEthic(e)}
                >
                  <span
                    className="fb-txt spotted-byuser"
                    style={{ color: "#fff" }}
                  >
                    {"Ethics"}
                  </span>
                </Button>

                <li style={{ textDecoration: "none" }}>
                  {this.state.spot.toggleEthics
                    ? this.state.ethics.map((ethic) => {
                        return (
                          <Form.Label
                            className="checkbox-container"
                            style={{ padding: "0 2vw", fontSize: "16px" }}
                          >
                            {ethic.type}
                            <input
                              style={{
                                position: "absolute",
                                opacity: "0",
                                cursor: "pointer",
                                height: "0",
                                width: "0",
                              }}
                              type="checkbox"
                              value={ethic._id}
                              onChange={(e) => this.checkBox4(e)}
                            />
                            <span className="checkmark"></span>
                          </Form.Label>
                        );
                      })
                    : null}
                </li>
              </Form.Group>
            </Form.Row>
            <div>
              <Button
                onClick={(e) => this.createPlace(e, this.state.spot)}
                style={{
                  margin: "2vh 15vw",
                  backgroundColor: "transparent",
                  fontFamily: "Jost",
                  border: "1 px solid white",
                }}
              >
                Publish this spot
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateFoodDrink;
