import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';

import Desk from './components/Desk';
import Initmodal from './components/Initmodal';
import Cards from './components/Cards';

class Part extends Component {
  render() {
    return(
      <div className={ `part ${ this.props.type.toLowerCase() } ${ this.props.target }` }>
        <Cards
          type={ this.props.type }
          target={ this.props.target }
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initModal: false
    }
  }

  componentDidMount() {
    this.setState(() => ({ initModal: true }));
  }

  render() {
    return(
      <Fragment>
        {
          (!this.props.global.isLoop && !this.props.global.winMessage) ? (
            <Fragment>
              <Initmodal />
              <Part
                type="top"
                target="bot"
                currentTurn={ (this.props.global) ? {"BOT_TURN": "bot", "USER_TURN": "user"}[this.props.global.currentTurn] : "" }
              />
              <Desk />
              <Part
                type="bottom"
                target="player"
                currentTurn={ (this.props.global) ? {"BOT_TURN": "bot", "USER_TURN": "user"}[this.props.global.currentTurn] : "" }
              />
            </Fragment>    
          ) : (
            (this.props.global.isLoop) ? (
              <span className="alertion" onClick={ this.props.initGame }>TIE!</span>
            ) : (
              <span className="alertion" onClick={ this.props.initGame }>{ this.props.global.winMessage }</span>
            )
          )
        }
        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  global
});

const mapActionsToProps = {
  initGame: () => ({ type: 'INITIALIZE_GAME', payload: true })
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
