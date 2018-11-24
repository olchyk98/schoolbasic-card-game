import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cardback } from '../images';

import Card from './Card';

class DeskStack extends Component {
    render() {
        return(
            <div className="desk-flow-stack">
                {
                    this.props.cards.map(({ value, sender }, index) => (
                        <Card
                            key={ index }
                            isCasted={ true }
                            value={ value }
                            sender={ sender }
                        />
                    ))
                }
            </div>
        );
    }
}

class Desk extends Component {
    render() {
        return(
            <div className="desk">
                <div />
                <div className="desk-flow">
                    {
                        (this.props.global.gameDesk) ? (
                            this.props.global.gameDesk.map((session, index) => (
                                <DeskStack
                                    key={ index }
                                    cards={ session }
                                />
                            ))
                        ) : null
                    }
                </div>
                <div className="desk-cards">
                    {
                        (this.props.global.currentTurn === 'USER_TURN') ? (
                            <button
                                className="desk-cards-pass"
                                onClick={ this.props.passTurn }>
                                PASS
                            </button>
                        ) : null
                    }
                    {
                        (this.props.global.deskSize) ? (
                            <img src={ cardback } alt="desk cards" className="desk-cards-image" />
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    global
});

const mapActionsToProps = {
    passTurn: () => ({ type: 'PASS_CURRENT_TURN', payload: '' })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Desk);

