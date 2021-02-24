import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";
import Spot from "./components/Spot.jsx";
import Create from "./components/CreateSpot/Create.jsx";
import Category from "./components/CreateSpot/Category.jsx";
import CreateFoodDrink from "./components/CreateSpot/CreateFoodDrink.jsx";
import CreateFoodShop from "./components/CreateSpot/CreateFoodShop.jsx";
import CreateStoreType from "./components/CreateSpot/CreateStoreType.jsx";
import CreateMiscType from "./components/CreateSpot/CreateMiscType.jsx";
import Spots from "./components/Spots.jsx";
import Landing from "./components/Landing.jsx";

// import TopNav from "./components/Nav-Top.jsx";
// import NavSpots from "./components/Nav-Spots.jsx";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/create" component={Create} />
          <Route path="/create-food-drink" component={CreateFoodDrink} />
          <Route path="/create-food-shop" component={CreateFoodShop} />
          <Route path="/create-store" component={CreateStoreType} />
          <Route path="/create-misc" component={CreateMiscType} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Signup" component={Signup} />
          <Route path="/spots/:id" component={Spot} />
          <Route path="/spots" component={Spots} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
