import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { useField } from 'formik';
import AppInput from '../AppInput';

interface AppFormInputProps extends TextInputProps {
  name: string;
  label: string;
  /** SVG icon rendered on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Custom right-side element. Omit for password fields — eye toggle is automatic. */
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

const AppFormInput: React.FC<AppFormInputProps> = ({
  name,
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <AppInput
      label={label}
      value={field.value}
      onChangeText={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onRightIconPress={onRightIconPress}
      containerStyle={containerStyle}
      {...rest}
    />
  );
};

export default AppFormInput;
