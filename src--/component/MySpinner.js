import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {Theme} from '@global';

class MySpinner extends Component {
 
  render() {
    const {visible,size} = this.props;
    return (
      <Spinner
        size={size || 'large'}
        overlayColor="rgba(0, 0, 0, 0.55)"
        color={Theme.WHITE}
        visible={visible}
        textStyle={style.spinnerTextStyle}
      />
    );
  }
}

const style = {
  spinnerTextStyle: {
    color: '#FFF',
  },
};

export {MySpinner};
