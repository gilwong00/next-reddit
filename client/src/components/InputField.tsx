import { useField } from 'formik';
import { Input, FormErrorMessage } from '@chakra-ui/react';

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const InputField: React.FC<IProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Input {...field} {...props} />
      {meta.touched && meta.error && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </>
  );
};
