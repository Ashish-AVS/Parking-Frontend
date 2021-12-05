import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import { getCurrentUser } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import PrivateRoute from "../common/PrivateRoute";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import ParkingSpaces from "../Admin/ParkingSpace";
import WorkerList from "../Admin/WorkerList";
import Userdashboard from "../UserComponents/Userdashboard";
import BookSlot from "../components/BookSlot/BookSlot";
import BillDisplay from "../components/BillPayment/BillDisplay";
import Paymentmode from "../components/BillPayment/Paymentmode";
import WorkerDashboard from "../components/WorkerDashboard";
import PaymentSuccess from "../components/BillPayment/PaymentSuccess";
import AdminDashboard from "../Admin/AdminDashboard";
import Dashboard from "../Admin/AdminDashboard";
import HomePage from "../components/HomePage";
import NavBar from "../container/Navigation";
import OTPSignup from "../user/signup/OTPSignup";
import StripePayment from '../components/StripePayment'
import WorkerRating from "../components/WorkerRating";
import UserData from "../Admin/UserData";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app">
        <div className="app-top-box">
          {/* <AppHeader
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
          /> */}
          <NavBar
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
            role={this.state.currentUser}
          />
        </div>
        <div className="app-body">
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
             <Route path="/signupotp" component={OTPSignup} />
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/oauth2/redirect"
              component={OAuth2RedirectHandler}
            ></Route>
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            ></PrivateRoute>
            {/* <Route path="/signup" element={<SignUp />} /> */}

            {this.state.authenticated && (
              <div>
                <Route path="/parking-spaces" component={ParkingSpaces} />
                <Route path="/user-data" component={UserData} />

                <Route path="/worker-list" component={WorkerList} />
                {/* currentUser={this.state.currentUser} */}
                <Route path="/user-dashboard" 
                render={(props) => (
                  <Userdashboard currentUser={this.state.currentUser} {...props} />
                )} />
                <Route path="/book-slot" 
                 render={(props) => (
                  <BookSlot currentUser={this.state.currentUser} {...props} authed={true} />
                )}
                currentUser={this.state.currentUser}/>
                {/* <Route path="/login" element={Login} /> */}
                <Route path="/bill" 
                 render={(props) => (
                  <BillDisplay currentUser={this.state.currentUser} {...props} authed={true} />
                )}
                 />
                <Route path="/bill-paymentmode" component={Paymentmode} />
                <Route path="/bill-paymentsuccess" 
                 render={(props) => (
                  <PaymentSuccess {...props} />
                )}
                />
                 {/* <Route path="/bill-paymentsuccess" component={PaymentSuccess} /> */}
                <Route path="/admin-dashboard" component={AdminDashboard} />
                <Route path="/worker-dashboard" component={WorkerDashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/pay" component={StripePayment} />
                <Route path="/rate/:services" component={WorkerRating} />
                <Route exact path="/" component={HomePage} />
                {/* role={this.state.currentUser} */}
              </div>
            )}
            <Route exact path="/" component={Home}></Route>

            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </div>
    );
  }
}

export default App;
// https://material-tailwind.com/documentation/react/radioButton
/**
 * make a single specialisation for worker 
 * and store id of worker when adding his service
 * add cost to bill and save it
 * 
 * worker can create his oown account and add his specialisations 
 * admin can delete the worker's account
 */