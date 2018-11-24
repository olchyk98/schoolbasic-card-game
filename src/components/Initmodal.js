import React, { Component } from 'react';
import { connect } from 'react-redux';

class Initmodal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputIsFail: false,
            inputIsSuccess: false
        }
    }

    validateInput = value => {
        let a = (value.toString() && value.toString().replace(/ /g, "").length) ? true:false;
        this.setState(() => ({
            inputIsFail: !a,
            inputIsSuccess: a
        }));
    }

    startGame = () => {
        if(this.state.inputIsSuccess && !this.props.global.inGame) this.props.startGame();
    }

    render() {
      return(
        <div className={ `initmodal${ (this.props.global.inGame) ? "" : " visible" }` }>
          <div className="initmodal-mat">
            <h1 className="initmodal-mat-title">Hi!</h1>
            <p className="initmodal-mat-description">Enter your nickname</p>
            <input
              placeholder="Nickname"
              onChange={ ({ target: { value } }) => this.validateInput(value) }
              className={ `initmodal-mat-input${ (this.state.inputIsFail) ? " red" : "" }${ (this.state.inputIsSuccess) ? " green" : "" }` }
            />
            <button
                className={ `initmodal-mat-submit${ (this.props.global.inGame) ? " started" : "" }` }
                onClick={ this.startGame }>
                    Start game
                </button>
          </div>
        </div>
      );
    }
}

const mapStateToProps = ({ global }) => ({
    global
});

const mapActionsToProps = {
    startGame: () => ({ type: 'INITIALIZE_GAME', payload: true })
}
  
export default connect(
    mapStateToProps,
    mapActionsToProps
)(Initmodal);