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
import CategoryCards from "./CategoryCards.jsx";
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

  selectBackground = (background) => {
    return { backgroundImage: `url('${background}')` };
  };

  UNSAFE_componentWillMount() {
    let categories = this.state.categories;
    // let about = this.state.about;

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
        <Container>
          <div className="grid twocards">
            {this.state.categories.map((category) => (
              <CategoryCards category={category} key={category._id} />
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Create);
