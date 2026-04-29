import React from 'react';
import { ViewStyle } from 'react-native';
import { useFormikContext } from 'formik';
import AppButton from '../AppButton';
import { AppButtonVariant } from '../../../types';

interface AppFormSubmitButtonProps {
  title: string;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const AppFormSubmitButton: React.FC<AppFormSubmitButtonProps> = ({
  title,
  variant = 'primary',
  fullWidth = true,
  style,
}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={() => handleSubmit()}
      variant={variant}
      loading={isSubmitting}
      disabled={isSubmitting}
      fullWidth={fullWidth}
      style={style}
    />
  );
};

export default AppFormSubmitButton;
