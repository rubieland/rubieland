import ControlledTextInput from '../../../../components/FormInputs/ControlledFormInputs/ControlledTextInput';
import { useLoginFormValidation } from '../hooks/useLoginFormValidation';
import CustomButton from '../../../../components/Button/CustomButton';
import { LoginBody } from '../../../../../models/user/user.entity';
import usePasswordVisibility from '../hooks/usePasswordVisibility';
import { addAsterisk } from '../../../../../utils/string.utils';
import { isFormValid } from '../../../../../utils/form.utils';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSubmit: (data: LoginBody) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { t } = useTranslation();
  const { togglePasswordVisibility, isPasswordVisible } =
    usePasswordVisibility();
  const form = useLoginFormValidation();
  const watchedValues = form.watch(['email', 'password']);
  const isFormFilled = isFormValid(watchedValues);

  return (
    <FormProvider {...form}>
      <form>
        <ControlledTextInput
          placeholder={addAsterisk(t('form.user.emailLabel'))}
          label={t('form.user.emailPlaceholder')}
          autocomplete="email"
          name="email"
          type="email"
        />
        <ControlledTextInput
          togglePasswordVisibility={togglePasswordVisibility}
          placeholder={addAsterisk(t('form.user.password'))}
          isPasswordVisible={isPasswordVisible}
          label={t('form.user.password')}
          autocomplete="new-password"
          name="password"
          type="password"
        />
        <div className="form-input">
          <CustomButton
            onClick={form.handleSubmit(onSubmit)}
            title={t('common.login')}
            isDisabled={!isFormFilled}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
