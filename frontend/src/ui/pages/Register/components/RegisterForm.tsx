import ControlledDatePicker from '../../../components/FormInputs/ControlledFormInputs/ControlledDatePicker';
import ControlledTextInput from '../../../components/FormInputs/ControlledFormInputs/ControlledTextInput';
import { useRegisterFormValidation } from '../hooks/useRegisterFormValidation';
import { calculateMinDateYYYYMMDD } from '../../../../utils/date.utils';
import CustomButton from '../../../components/Button/CustomButton';
import { RegisterBody } from '../../../../models/user/user.entity';
import { addAsterisk } from '../../../../utils/string.utils';
import { isFormValid } from '../../../../utils/form.utils';
import { FormProvider } from 'react-hook-form';
import i18n from '../../../../core/i18n';

const today = new Date();
const formattedMaxBirthDate = calculateMinDateYYYYMMDD(today, 16);
const formattedMinBirthDate = calculateMinDateYYYYMMDD(today, 99);

interface RegisterFormProps {
  onSubmit: (data: RegisterBody) => void;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
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
          label={addAsterisk(i18n.t('form.user.firstName'))}
          placeholder={i18n.t('form.user.firstName')}
          autocomplete="given-name"
          name="firstName"
          withLabel
        />
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.lastName'))}
          placeholder={i18n.t('form.user.lastName')}
          autocomplete="family-name"
          name="lastName"
          withLabel
        />
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.emailLabel'))}
          placeholder={i18n.t('form.user.emailPlaceholder')}
          autocomplete="email"
          name="email"
          type="email"
          withLabel
        />
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.password'))}
          placeholder={i18n.t('form.user.password')}
          autocomplete="new-password"
          name="password"
          type="password"
          withLabel
        />
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.confirmPassword'))}
          placeholder={i18n.t('form.user.confirmPassword')}
          name="confirmPassword"
          type="password"
          withLabel
        />
        <ControlledDatePicker
          label={addAsterisk(i18n.t('form.user.birthDate'))}
          maxDate={formattedMaxBirthDate}
          minDate={formattedMinBirthDate}
          autocomplete="bday"
          name="birthDate"
        />
        <ControlledTextInput
          label={addAsterisk(i18n.t('form.user.phoneLabel'))}
          placeholder={i18n.t('form.user.phonePlaceholder')}
          autocomplete="tel"
          name="phone"
          withLabel
        />
        <div className="form-input">
          <CustomButton
            onClick={form.handleSubmit(onSubmit)}
            title={i18n.t('common.register')}
            isDisabled={!isFormFilled}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;