import React from "react";
import axios from "axios";
import {
  Container,
  Form,
  Accordion,
  Card,
  Button,
  Col,
  ProgressBar,
} from "react-bootstrap";
// import "../styles/create.css";
// import "../styles/universal.css";
import Category from "./Category.jsx";
import { Link, withRouter } from "react-router-dom";

class Create extends React.Component {
  state = {
    user: {},
    spot: {},
    categories: [
      {
        image: [],
        name: "",
        about: "",
      },
    ],
  };

  // UNSAFE_componentWillMount() {
  // let about = this.state.about;

  // axios
  //   .get(`http://localhost:4000/categories`)
  //   .then((res) => {
  //     categories = res.data;
  //     this.setState({ categories });
  //   })
  //   .catch((err) => {
  //     console.log({ err });
  //   });
  // }
  componentDidMount() {
    let spot = this.state.spot;
    let categories = this.state.categories;
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

    axios
      .get(`http://localhost:4000/categories`)
      .then((res) => {
        categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  //  moved to category.jsx
  // selectBackground = (background) => {
  //   return { backgroundImage: `url('${background}')` };
  // };

  //setState with input
  changeField = (e, field) => {
    let spot = this.state.spot;
    spot[field] = e.target.value;
    this.setState({ spot });
  };
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
        let categoryId = res.data.category._id;
        this.props.history.push(`/create/${categoryId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
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
        </Container>

        <h1
          style={{
            fontFamily: "Jost",
            color: "gray",
            fontSize: "25px",
            letterSpacing: "3px",
            textAlign: "left",
            margin: "2vh 0px -12vh",
            textTransform: "capitalize",
          }}
        >
          {" Step One. Choose the type of spot you're contributing:"}
        </h1>
        <div className="grid four">
          {this.state.categories.map((category) => (
            <Category category={category} key={category._id} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Create);
