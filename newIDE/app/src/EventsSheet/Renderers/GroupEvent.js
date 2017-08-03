import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from 'material-ui/TextField';
import {
  largeSelectedArea,
  largeSelectableArea,
  selectableArea,
} from '../ClassNames';
const gd = global.gd;

const styles = {
  container: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 18,
  },
};

export default class GroupEvent extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  edit = () => {
    this.setState({
      editing: true,
    });
  };

  endEditing = () => {
    this.setState({
      editing: false,
    });
  };

  render() {
    var groupEvent = gd.asGroupEvent(this.props.event);

    const r = groupEvent.getBackgroundColorR(),
      g = groupEvent.getBackgroundColorG(),
      b = groupEvent.getBackgroundColorB();

    const textColor = (r + g + b) / 3 > 200 ? 'black' : 'white';

    return (
      <div
        className={classNames({
          [largeSelectableArea]: true,
          [largeSelectedArea]: this.props.selected,
        })}
        style={{
          ...styles.container,
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
        onClick={this.edit}
      >
        {this.state.editing
          ? <TextField
              value={groupEvent.getName()}
              onBlur={this.endEditing}
              onChange={(e, text) => {
                groupEvent.setName(text);
                this.forceUpdate();
              }}
              style={styles.title}
              inputStyle={{
                color: textColor,
                WebkitTextFillColor: textColor,
              }}
              underlineFocusStyle={{
                borderColor: textColor,
              }}
              fullWidth
              id="group-title"
            />
          : <span
              className={classNames({
                [selectableArea]: true,
              })}
              style={{ ...styles.title, color: textColor }}
            >
              {groupEvent.getName()}
            </span>}
      </div>
    );
  }
}
