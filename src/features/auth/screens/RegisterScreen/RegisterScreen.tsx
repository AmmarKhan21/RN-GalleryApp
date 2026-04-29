import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Colors, Spacing, BorderRadius } from '../../../../theme';
import { moderateScale } from '../../../../utils/responsive';
import { registerSchema } from '../../../../utils/validationSchemas';
import { RegisterFormValues } from '../../../../types';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import { registerUser } from '../../store/authSlice';
import { UserIcon, MailIcon, PhoneIcon, LockIcon, GalleryIcon } from '../../../../shared/assets/icons';

import AppText from '../../../../shared/components/AppText';
import AppForm, { AppFormSubmitButton } from '../../../../shared/components/AppForm';
import AppFormInput from '../../../../shared/components/AppFormInput';

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
};

const RegisterScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleRegister = useCallback(
    (values: RegisterFormValues) => {
      dispatch(registerUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
      }));
    },
    [dispatch],
  );

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.background}
        translucent={false}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <GalleryIcon size={moderateScale(36)} color={Colors.primary} />
            </View>
            <AppText variant="display" align="center" style={styles.title}>
              Create Account
            </AppText>
            <AppText variant="bodySmall" align="center" style={styles.subtitle}>
              Join thousands of photographers{'\n'}sharing their best moments
            </AppText>
          </View>

          <View style={styles.formContainer}>
            <AppForm
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={handleRegister}
            >
              <AppFormInput
                name="name"
                label="Full Name"
                leftIcon={<UserIcon size={moderateScale(18)} color={Colors.textMuted} />}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />
              <AppFormInput
                name="email"
                label="Email Address"
                leftIcon={<MailIcon size={moderateScale(18)} color={Colors.textMuted} />}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
              <AppFormInput
                name="phone"
                label="Phone Number (10 digits)"
                leftIcon={<PhoneIcon size={moderateScale(18)} color={Colors.textMuted} />}
                keyboardType="number-pad"
                maxLength={10}
                returnKeyType="next"
              />
              <AppFormInput
                name="password"
                label="Password"
                leftIcon={<LockIcon size={moderateScale(18)} color={Colors.textMuted} />}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />
              <View style={styles.formSpacer} />
              <AppFormSubmitButton
                title="Create Account"
                variant="primary"
                fullWidth
                style={styles.submitButton}
              />
              <AppText variant="caption" align="center" style={styles.terms}>
                By creating an account you agree to our{' '}
                <AppText variant="caption" color={Colors.primary}>Terms of Service</AppText>
                {' '}and{' '}
                <AppText variant="caption" color={Colors.primary}>Privacy Policy</AppText>
              </AppText>
            </AppForm>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: Spacing.base, paddingBottom: Spacing.xxxl },
  header: { alignItems: 'center', paddingTop: moderateScale(56), paddingBottom: moderateScale(36), gap: Spacing.md },
  logoBadge: {
    width: moderateScale(80), height: moderateScale(80),
    borderRadius: BorderRadius.xxl, backgroundColor: Colors.surfaceElevated,
    borderWidth: 1.5, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: { color: Colors.textPrimary },
  subtitle: { color: Colors.textSecondary, lineHeight: moderateScale(20) },
  formContainer: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Colors.surfaceBorder, padding: Spacing.xl,
  },
  submitButton: { marginBottom: Spacing.base },
  formSpacer: { height: Spacing.base },
  terms: { color: Colors.textMuted, lineHeight: moderateScale(18) },
});

export default RegisterScreen;
