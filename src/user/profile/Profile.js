import React, { Component } from "react";
import "./Profile.css";
import {Link} from 'react-router-dom';
import StripePayment from '../../components/StripePayment'

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {this.props.currentUser.imageUrl ? (
                <img
                  src={this.props.currentUser.imageUrl}
                  alt={this.props.currentUser.name}
                />
              ) : (
                <div className="text-avatar">
                  <span>
                    {this.props.currentUser.name &&
                      this.props.currentUser.name[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="profile-name">
              <h2>{this.props.currentUser.name}</h2>
              {/* <h2>Available Balance: ₹{this.props.currentUser.fastTag >= 0 ? this.props.currentUser.fastTag : 0}</h2> */}
              <h2>Available Balance: ₹{this.props.currentUser.fastTag}</h2>
              <p className="profile-email">{this.props.currentUser.email}</p>
              <div>Pay using Stripe <StripePayment email={this.props.currentUser.email} id={this.props.currentUser.id}/></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
