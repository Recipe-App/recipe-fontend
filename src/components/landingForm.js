import React, { Component } from "react";
import { createPantryItems, getPantryItems } from "../api/index";
import AuthService from "../services/AuthService";

class LandingForm extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      form: {
        pantry_item: {
          user_id: "",
          proteins: "",
          veggies: "",
          grains: "",
          seasonings: "",
          other: ""
        }
      }
    };
  }
  handleChange(event) {
    let { form } = this.state;
    form.pantry_item[event.target.name] = event.target.value;
    this.setState({ form: form });
  }
  handleSubmit(event) {
    event.preventDefault();
    let { form } = this.state;
    form.pantry_item.user_id = this.Auth.getUserId();

    createPantryItems(form)
      .then(successPantry => {
        this.props.history.replace("/recipes");
      })
      .catch(err => console.log(err));
  }
  componentWillMount() {
    let id = this.Auth.getUserId();
    let array = [];
    getPantryItems(id).then(resp => {
      let { form } = this.state;
      if (resp !== null) {
        form.pantry_item.proteins = resp.proteins;
        form.pantry_item.veggies = resp.veggies;
        form.pantry_item.grains = resp.grains;
        form.pantry_item.seasonings = resp.seasonings;
        form.pantry_item.other = resp.other;
        this.setState({ form });
      }
    });
  }

  render() {
    return (
      <div className="landingFormContainer">
        <form className="landingForm" onSubmit={this.handleSubmit.bind(this)}>
          <div className="landing-grid">
            <input
              type="text"
              name="proteins"
              value={this.state.form.pantry_item.proteins}
              placeholder="Proteins"
              onChange={this.handleChange.bind(this)}
            />

            <input
              type="text"
              name="veggies"
              value={this.state.form.pantry_item.veggies}
              placeholder="Vegetables"
              onChange={this.handleChange.bind(this)}
            />

            <input
              type="text"
              name="grains"
              value={this.state.form.pantry_item.grains}
              placeholder="Grains"
              onChange={this.handleChange.bind(this)}
            />

            <input
              type="text"
              name="seasonings"
              placeholder="Spices"
              value={this.state.form.pantry_item.seasonings}
              onChange={this.handleChange.bind(this)}
            />

            <input
              type="text"
              name="other"
              placeholder="Other"
              value={this.state.form.pantry_item.other}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <button className="buttonLanding" type="submit" value="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default LandingForm;
