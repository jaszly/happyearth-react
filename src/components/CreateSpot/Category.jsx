import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Form,
  Accordion,
  Card,
  Button,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
// import "../../styles/create.css";

class Category extends React.Component {
  state = {
    spot: this.props.spot,
    category: this.props.category,
    // user: {},
    // spot: {},
    // categories: {
    // image: [],
    // name: "",
    // about: "",
    // },
  };

  selectBackground = (background) => {
    return { backgroundImage: `url('${background}')` };
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState({ category: this.props.category });
  }

  // UNSAFE_componentWillMount() {
  //   let category = this.state.category;
  //   let about = this.state.about;

  //   axios
  //     .get(`http://localhost:4000/categories`)
  //     .then((res) => {
  //       category = res.data;
  //       this.setState({ category });
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }

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
          // this.state.spot.types = this.stae.types[0]._id;
          this.setState({ spot });
        })
        .catch((err) => console.log(err));
    }
  }

  //setState with input
  // changeField = (e, field) => {
  //   let spot = this.state.spot;
  //   spot[field] = e.target.value;
  //   this.setState({ spot });
  // };
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
      <div>
        <Row>
          <Col>
            <Link
              className="card link"
              to={`/create-${this.state.category.linkTitle}`}
              style={{ maxWidth: "fit-content", height: "40vh" }}
            >
              <i
                className={this.state.category.image}
                style={{
                  color: "#00988f",
                  fontSize: "8vh",
                  margin: "10vh 0 0 8vw",
                }}
              ></i>
              <h1 style={{ margin: "1vh 1vw 0 3vw" }}>
                {this.state.category.displayTitle}
              </h1>
              <div>
                <h6>{this.state.category.about}</h6>
              </div>
            </Link>
          </Col>
        </Row>

        <Form className="createform" style={{ margin: "0 -10vh" }}>
          <Link
            className="card link "
            to={`/create-${this.state.category.linkTitle}`}
            style={{ padding: "25vh 3vw" }}
          >
            <div>
              <i
                style={{
                  color: "#00988f",
                  fontSize: "8vh",
                  margin: "6vw 6vw 0 6vw",
                }}
                className={this.state.category.image}
              >
                {" "}
              </i>
            </div>

            <h1 style={{ margin: "1vh" }}>
              {this.state.category.displayTitle}
            </h1>

            <div>
              <h6
                style={{
                  margin: "-2vh 2vw 0 2vw",
                  fontSize: "100%",
                  padding: "2vh",
                }}
              >
                {this.state.category.about}
              </h6>
            </div>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Category;
