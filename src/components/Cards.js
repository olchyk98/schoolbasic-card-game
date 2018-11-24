import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card';

class Cards extends Component {
    render() {
        return(
            <div className={ `part-cards ${ this.props.type.toLowerCase() } ${ this.props.target.toLowerCase() }` }>
                {
                    (this.props.global.inGame && this.props.global.playerDesk && this.props.global.botDesk) ? (
                        this.props.global[(this.props.target === "player") ? "playerDesk" : "botDesk"].map((session, index) => (
                            <Card
                                key={ index }
                                value={ (this.props.target === "player") ? session : "" }
                            />
                        ))
                    ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = ({ global }) => ({
  global
});

export default connect(
  mapStateToProps
)(Cards);
