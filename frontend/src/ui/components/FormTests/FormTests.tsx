import ControlledDatePicker from '../FormInputs/ControlledFormInputs/ControlledDatePicker';
import ControlledFileInput from '../FormInputs/ControlledFormInputs/ControlledFileInput';
import ControlledTextInput from '../FormInputs/ControlledFormInputs/ControlledTextInput';
import ControlledCheckbox from '../FormInputs/ControlledFormInputs/ControlledCheckbox';
import ControlledTextarea from '../FormInputs/ControlledFormInputs/ControlledTextarea';
import ControlledSelect from '../FormInputs/ControlledFormInputs/ControlledSelect';
import { acceptedMimeTypesString } from '../../../core/fileUploadConfig';
import { useFormTestsValidation } from './hooks/useFormTestsValidation';
import { SelectItem } from '../FormInputs/types/FormInputsTypes';
import { addAsterisk } from '../../../utils/string.utils';
import { isFormValid } from '../../../utils/form.utils';
import CustomButton from '../Button/CustomButton';
import { FormProvider } from 'react-hook-form';
import '../../../assets/styles/form.scss';
import i18n from '../../../core/i18n';

const mockSelectPlaceholder: SelectItem = {
  value: '',
  label: 'Vous êtes...',
};

const mockSelectItems: SelectItem[] = [
  {
    label: 'Homme',
    value: 'male',
  },
  {
    label: 'Femme',
    value: 'female',
  },
];

const today = new Date();
const maxBirthDate = today.toISOString();
const minBirthDate = new Date(
  today.setFullYear(today.getFullYear() - 99),
).toISOString();
const formattedMaxBirthDate = maxBirthDate.split('T')[0];
const formattedMinBirthDate = minBirthDate.split('T')[0];

const FormTests = () => {
  const form = useFormTestsValidation();
  const watchedValues = form.watch([
    'email',
    'password',
    'description',
    'birthDate',
  ]);
  const isFormFilled = isFormValid(watchedValues);
  const onSubmit = () => {
    console.log('Submit with data: ', form.getValues());
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ControlledFileInput
          acceptedMimetypes={acceptedMimeTypesString}
          label="Modifier la photo de profil"
          pictureType="avatar"
          name="avatar"
        />
        <ControlledFileInput
          acceptedMimetypes={acceptedMimeTypesString}
          label="Modifier l'image de l'article"
          pictureType="articlePicture"
          name="avatar"
        />
        <ControlledSelect
          placeholder={mockSelectPlaceholder}
          items={mockSelectItems}
          label="Civilité"
          name="gender"
          withLabel
        />
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
        <ControlledDatePicker
          label="Date de naissance"
          name="birthDate"
          maxDate={formattedMaxBirthDate}
          minDate={formattedMinBirthDate}
        />

        <ControlledTextarea label="Description" name="description" withLabel />
        <ControlledCheckbox label="Publier cet article ?" name="isPublished" />
        <div className="form-input">
          <CustomButton
            title={i18n.t('common.send')}
            isDisabled={!isFormFilled}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FormTests;
