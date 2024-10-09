import { PostBody } from '@/models/posts/post.entity';
import { useForm } from 'react-hook-form';

const usePostForm = () => {
  const formMethods = useForm<PostBody>({
    defaultValues: {
      title: '',
      content: '',
      picture: null,
      isPublished: false,
    },
  });

  return formMethods;
};

export default usePostForm;
