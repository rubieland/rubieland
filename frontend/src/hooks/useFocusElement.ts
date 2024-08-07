import { useEffect, RefObject } from 'react';

type UseFocusElementType = {
  ref: RefObject<HTMLElement>;
};

const useFocusElement = ({ ref }: UseFocusElementType) => {
  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    if (ref.current) {
      ref.current.focus();
    }

    return () => {
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [ref]);
};

export default useFocusElement;
