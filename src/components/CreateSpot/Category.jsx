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
import TopNav from "./../Nav-Top.jsx";

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
      <>
        <Link
          className="card link"
          to={`/create-${this.state.category.linkTitle}`}
          style={{
            height: "100%",
            width: "75%",
            textAlign: "center",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
            maxHeight: "30vh",
            itemsAlign: "center",
            margin: "28vh 0 0 8vw",
            transition:
              "box-shadow .3s ease,background-color .3s ease,border-color .3",
          }}
        >
          <i
            className={this.state.category.image}
            style={{
              color: "#00988f",
              fontSize: "5vh",
              textAlign: "center",
              padding: "4vh 0 0 0",
            }}
          ></i>
          <h1
            style={{
              fontSize: "3vh",
              fontFamily: "Jost",
              textTransform: "lowercase",
              letterSpacing: "1.5px",
              padding: "2vh 0 0 0",
            }}
          >
            {this.state.category.displayTitle}
          </h1>
          <div>
            <h6
              style={{
                fontSize: "2vh",
                fontFamily: "Jost",
                textTransform: "lowercase",
                letterSpacing: "1.5px",
                lineHeight: " 4vh",
                padding: "0 2vw",
              }}
            >
              {this.state.category.about}
            </h6>
          </div>
        </Link>
      </>
    );
  }
}

export default Category;
