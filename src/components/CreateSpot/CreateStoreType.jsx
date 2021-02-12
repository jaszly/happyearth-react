import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Form,
  Accordion,
  Card,
  Button,
  Col,
  Row,
  ProgressBar,
} from "react-bootstrap";
import "../../styles/forms.css";

class CreateStoreType extends React.Component {
  state = {
    user: {},
    spot: {
      files: [],
      images: [],
      types: [],
      ethics: [],
      features: [],
      lat: "",
      lng: "",
      toggleFeatures: false,
    },

    features: [],
    types: [],
  };

  UNSAFE_componentWillMount() {
    let categoryId = this.props.match.params.id;
    let types = this.state.types;
    let features = this.state.features;
    let ethics = this.state.ethics;

    // link to specific category as Id-ed by category id section
    axios
      .get(`http://localhost:4000/create/${categoryId}`)
      .then((res) => {
        this.setState({ category: res.data });
      })
      .catch((err) => {
        console.log({ err });
      });
    axios
      .get(`http://localhost:4000/typesstore`)
      .then((res) => {
        types = res.data;
        this.setState({ types });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/features`)
      .then((res) => {
        features = res.data;
        this.setState({ features });
        console.log({ features });
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
          this.state.spot.types = this.stae.types[0]._id;
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

  //toggle features
  toggleFeature = (e) => {
    let spot = this.state.spot;
    spot.toggleFeatures = !spot.toggleFeatures;
    this.setState({ spot });
  };

  //select features
  checkbox3 = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let eatins = spot.eatins;

    if (spot.features.find((feature) => feature === _id)) {
      spot.features = spot.features.filter((feature) => feature !== _id);
    } else {
      spot.features.push(_id);
      this.setState({ spot: spot.features });
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
      if (typeof this.state.spot[key] == "object" && key === "files") {
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
      <div style={{ margin: "10vh 25vw" }}>
        <Container>
          <h1
            style={{
              fontFamily: "Jost",
              color: "00988f",
              fontSize: "50px",
              letterSpacing: "3px",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            {" add a spot to happy earth"}
          </h1>
          <h1
            style={{
              fontFamily: "Jost",
              color: "gray",
              fontSize: "20px",
              letterSpacing: "3px",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            {
              " become a happy earth contributor by adding and reviewing new spots"
            }
          </h1>
          <h1
            style={{
              fontFamily: "Jost",
              color: "gray",
              fontSize: "25px",
              letterSpacing: "3px",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            {"Add details:"}
          </h1>{" "}
          <Form.Group>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    style={{ height: "4em" }}
                    size="sm"
                    type="text"
                    onChange={(e) => this.changeField(e, "title")}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label> Subcategory </Form.Label>
                  <Form.Control
                    style={{ height: "4em" }}
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
                    style={{ height: "8em" }}
                    as="textarea"
                    type="text"
                    rows={3}
                    onChange={(e) => this.changeField(e, "description")}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    style={{ height: "4em" }}
                    size="sm"
                    type="text"
                    onChange={(e) => this.changeField(e, "city")}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridNighborhood">
                  <Form.Label>Neighborhood</Form.Label>
                  <Form.Control
                    style={{ height: "4em" }}
                    size="sm"
                    type="text"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    style={{ height: "4em" }}
                    size="sm"
                    type="text"
                    onChange={(e) => this.changeField(e, "country")}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridLat">
                  <Form.Label className="labelfont">Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.spot.lat}
                    onChange={(e) => this.changeField(e, "lat")}
                    style={{ height: "4em" }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLng">
                  <Form.Label className="labelfont">Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.spot.lng}
                    onChange={(e) => this.changeField(e, "lng")}
                    style={{ height: "4em" }}
                  />
                </Form.Group>
              </Form.Row>
              <Row>
                <Link to="/landing">{"< Back"}</Link>
              </Row>
            </Form>
          </Form.Group>
        </Container>
      </div>
    );
  }
}

export default CreateStoreType;
