import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cardback, cardfront } from '../images';

class Card extends Component {
    cast = () => {
        if(this.props.global.currentTurn === "BOT_TURN" || this.props.isCasted) return;
        this.props.castCard({
            value: this.props.value,
            sender: "USER_TARGET"
        });
        this.props.runBot();
        this.props.clearBoard();
    }

    render() {
        return(
            <div
                className={ `part-cards-card${ (!this.props.isCasted) ? "" : " casted rotated"  } ${ ((this.props.sender && this.props.sender.toLowerCase()) || "") }` }
                onClick={ this.cast }>
                <div className="part-cards-card-front">
                    <img
                        src={ cardback }
                        className="part-cards-card-front-image"
                        alt="card"
                    />          
                </div>
                <div className="part-cards-card-back">
                    <img
                    src={ cardfront }
                    className="part-cards-card-back-image"
                    alt="card"
                    />
                    <span className="part-cards-card-back-mark">{ this.props.value }</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    global
});

const mapActionsToProps = {
    castCard: payload => ({ type: 'PUSH_CARD_TO_DESK', payload }),
    runBot: () => ({ type: 'START_BOT_RUNNER', payload: '' }),
    clearBoard: () => ({ type: 'ADAPTIVE_CLEAR_BOARD', payload: '' })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Card);