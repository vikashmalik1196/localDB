import React from 'react';
import {TextInput as PaperInput} from 'react-native-paper';
import PropTypes from 'prop-types';

const CustomInput = ({
  label,
  placeholder,
  onChangeText,
  disabled,
  multiline,
  keyboardType,
  secureTextEntry,
  value,
  style,
}) => {
  return (
    <>
      <PaperInput
        mode="flat"
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        
        onChangeText={text => onChangeText(text)}
        selectionColor='darkcyan'
        underlineColor='darkcyan'
        activeUnderlineColor='darkcyan'
        style={{backgroundColor:'white'}}
      />
    </>
  );
};
CustomInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
};

CustomInput.defaultProps = {
  disabled: false,
  multiline: false,
  keyboardType: 'default',
  secureTextEntry: false,
};

export default CustomInput;
