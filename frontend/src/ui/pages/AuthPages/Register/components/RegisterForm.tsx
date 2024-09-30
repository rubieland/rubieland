import ControlledDatePicker from '../../../../components/FormInputs/ControlledFormInputs/ControlledDatePicker';
import ControlledTextInput from '../../../../components/FormInputs/ControlledFormInputs/ControlledTextInput';
import { useRegisterFormValidation } from '../hooks/useRegisterFormValidation';
import { calculateMinDateYYYYMMDD } from '../../../../../utils/date.utils';
import CustomButton from '../../../../components/Button/CustomButton';
import { RegisterBody } from '../../../../../models/user/user.entity';
import { addAsterisk } from '../../../../../utils/string.utils';
import { isFormValid } from '../../../../../utils/form.utils';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';

const today = new Date();
const formattedMaxBirthDate = calculateMinDateYYYYMMDD(today, 16);
const formattedMinBirthDate = calculateMinDateYYYYMMDD(today, 99);

interface RegisterFormProps {
  onSubmit: (data: RegisterBody) => void;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { t } = useTranslation();
  const form = useRegisterFormValidation();
  const watchedValues = form.watch([
    'firstName',
    'lastName',
    'email',
    'password',
    'confirmPassword',
    'birthDate',
    'phone',
  ]);
  const isFormFilled = isFormValid(watchedValues);

  return (
    <FormProvider {...form}>
      <form>
        <ControlledTextInput
          placeholder={addAsterisk(t('form.user.firstName'))}
          label={t('form.user.firstName')}
          autocomplete="given-name"
          name="firstName"
        />
        <ControlledTextInput
          placeholder={addAsterisk(t('form.user.lastName'))}
          label={t('form.user.lastName')}
          autocomplete="family-name"
          name="lastName"
        />
        <ControlledTextInput
          placeholder={addAsterisk(t('form.user.emailLabel'))}
          label={t('form.user.emailPlaceholder')}
          autocomplete="email"
          name="email"
          type="email"
        />
        <ControlledTextInput
          placeholder={addAsterisk(t('form.user.password'))}
          label={t('form.user.password')}
          autocomplete="new-password"
          name="password"
          type="password"
        />
        <ControlledTextInput
          placeholder={addAsterisk(t('form.user.confirmPassword'))}
          label={t('form.user.confirmPassword')}
          name="confirmPassword"
          type="password"
        />
        <ControlledTextInput
          placeholder={`${addAsterisk(t('form.user.phoneLabel'))} (${t('form.user.phonePlaceholder')})`}
          label={t('form.user.phoneLabel')}
          autocomplete="tel"
          name="phone"
        />
        <ControlledDatePicker
          label={addAsterisk(t('form.user.birthDate'))}
          maxDate={formattedMaxBirthDate}
          minDate={formattedMinBirthDate}
          autocomplete="bday"
          name="birthDate"
        />
        <div className="form-input">
          <CustomButton
            onClick={form.handleSubmit(onSubmit)}
            title={t('common.register')}
            isDisabled={!isFormFilled}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
