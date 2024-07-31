import ControlledTextInput from '../FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledTextarea from '../FormInputs/ControlledFormInputs/ControlledTextarea';
import { useFormTestsValidation } from './hooks/useFormTestsValidation';
import { addAsterisk } from '../../../utils/string.utils';
import { isFormValid } from '../../../utils/form.utils';
import CustomButton from '../Button/CustomButton';
import { FormProvider } from 'react-hook-form';
import i18n from '../../../core/i18n';
import ControlledCheckbox from '../FormInputs/ControlledFormInputs/ControlledCheckbox';

const FormTests = () => {
  const form = useFormTestsValidation();
  const watchedValues = form.watch(['email', 'password', 'description']);
  const isFormFilled = isFormValid(watchedValues);
  const onSubmit = () => {
    console.log('Submit with data: ', form.getValues());
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.emailLabel'))}
          placeholder={i18n.t('form.user.emailPlaceholder')}
          name="email"
          type="email"
          withLabel
        />
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.password'))}
          placeholder={i18n.t('form.user.password')}
          name="password"
          type="password"
          withLabel
        />
        <ControlledTextarea label="Description" name="description" withLabel />
        <ControlledCheckbox label="Publier cet article ?" name="isPublished" />
        <CustomButton
          title={i18n.t('common.send')}
          isDisabled={!isFormFilled}
          type="submit"
        />
      </form>
    </FormProvider>
  );
};

export default FormTests;
