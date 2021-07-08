import React from "react";
import { Link } from "react-router-dom";
// import { slide as Menu } from "react-burger-menu";
import Login from "./Login.jsx";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Button, Navbar, Nav } from "react-bootstrap";

class TopNav extends React.Component {
  state = {
    localStorage: false,
    open: false,
    visible: false,
  };
  logoutButton(e) {
    e.preventDefault();
    localStorage.removeItem("token");
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.setState({ localStorage: false });
    } else {
      this.setState({ localStorage: true });
    }
  }

  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Navbar className="justify-content-end " style={{ paddingTop: "25px" }}>
          <Nav.Item>
            <Button variant="outline-light" style={{ fontFamily: "Kodchasan" }}>
              <i className="fas fa-globe-africa"></i>
              Browse
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Link to={`/create`}>
              <Button
                variant="outline-light"
                style={{ fontFamily: "Kodchasan" }}
              >
                <i className="far fa-edit"></i>
                Post
              </Button>
            </Link>
            <Link to={`/login`}>
              <Button
                variant="outline-light"
                style={{ fontFamily: "Kodchasan" }}
              >
                <i className="far fa-user"></i>
                Account
              </Button>
            </Link>
          </Nav.Item>
        </Navbar>
      </>
    );
  }
}

export default TopNav;
