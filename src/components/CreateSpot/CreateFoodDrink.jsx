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

class CreateFoodDrink extends React.Component {
  state = {
    user: {},
    category: {},
    spot: {
      files: [],
      images: [],
      types: [],
      eatins: [],
      takeaways: [],
      features: [],
      lat: "",
      lng: "",
      toggleEatins: false,
      toggleTakeaways: false,
      toggleFeatures: false,
    },
    eatins: [],
    takeaways: [],
    features: [],
    types: [],
  };

  UNSAFE_componentWillMount() {
    let categoryId = this.props.match.params.id;
    let types = this.state.types;
    let eatins = this.state.eatins;
    let takeaways = this.state.takeaways;
    let features = this.state.features;

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

  //toggle features
  toggleFeature = (e) => {
    let spot = this.state.spot;
    spot.toggleFeatures = !spot.toggleFeatures;
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
  checkbox2 = (e) => {
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
      if (
        (typeof this.state.spot[key] == "object" && key === "eatins") ||
        key === "takeaways"
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
      <Container>
        <h1
          style={{
            fontFamily: "Jost",
            color: "00988f",
            fontSize: "50px",
            letterSpacing: "3px",
            textAlign: "left",
            margin: "12vh 0 0",
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
            margin: "2vh 0px -12vh",
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
            margin: "20vh 0px -12vh",
            textTransform: "capitalize",
          }}
        >
          {"Add details:"}
        </h1>

        <Form style={{ marginTop: "15vh" }}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Business Name</Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> Subcategory </Form.Label>
              <Form.Control
                size="sm"
                as="select"
                onChange={(e) => this.changeField(e, "types")}
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
              <Form.Control as="textarea" type="text" rows={3} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> City </Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Neigborhood</Form.Label>

              <Form.Control size="sm" type="text" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Country</Form.Label>
              <Form.Control size="sm" type="text" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> Lattitude </Form.Label>
              <Form.Control
                type="number"
                value={this.state.spot.lat}
                onChange={(e) => this.changeField(e, "lat")}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label> Longitude </Form.Label>
              <Form.Control
                type="number"
                value={this.state.spot.lng}
                onChange={(e) => this.changeField(e, "lng")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button variant="light" onClick={(e) => this.toggleTakeaway(e)}>
              Add features{" "}
            </Button>
          </Form.Row>

          <Form.Row style={{ marginTop: "6vh", padding: "0, 2vw" }}>
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
                      <span class="checkmark"></span>
                    </Form.Label>
                  );
                })
              : null}
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default CreateFoodDrink;
