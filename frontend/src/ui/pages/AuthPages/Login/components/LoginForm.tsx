import ControlledTextInput from '../../../../components/FormInputs/ControlledFormInputs/ControlledTextInput';
import { useLoginFormValidation } from '../hooks/useLoginFormValidation';
import CustomButton from '../../../../components/Button/CustomButton';
import { LoginBody } from '../../../../../models/user/user.entity';
import { addAsterisk } from '../../../../../utils/string.utils';
import { isFormValid } from '../../../../../utils/form.utils';
import { FormProvider } from 'react-hook-form';
import i18n from '../../../../../core/i18n';

interface LoginFormProps {
  onSubmit: (data: LoginBody) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useLoginFormValidation();
  const watchedValues = form.watch(['email', 'password']);
  const isFormFilled = isFormValid(watchedValues);
  return (
    <FormProvider {...form}>
      <form>
        <ControlledTextInput
          placeholder={addAsterisk(i18n.t('form.user.emailLabel'))}
          label={i18n.t('form.user.emailPlaceholder')}
          autocomplete="email"
          name="email"
          type="email"
        />
        <ControlledTextInput
          placeholder={addAsterisk(i18n.t('form.user.password'))}
          label={i18n.t('form.user.password')}
          autocomplete="new-password"
          name="password"
          type="password"
        />
        <div className="form-input">
          <CustomButton
            onClick={form.handleSubmit(onSubmit)}
            title={i18n.t('common.login')}
            isDisabled={!isFormFilled}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
