import React from 'react';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { ObjectSchema } from 'yup';

interface AppFormProps<T extends FormikValues> {
  initialValues: T;
  validationSchema: ObjectSchema<Partial<T>>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
  children: React.ReactNode;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

function AppForm<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  validateOnBlur = true,
  validateOnChange = false,
}: AppFormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
