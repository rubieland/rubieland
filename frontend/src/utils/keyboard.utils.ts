type HandleKeyDownActionType = {
  e: React.KeyboardEvent | React.KeyboardEvent<'a'>;
  keys: KeyboardEvent['key'][];
  action: () => void;
  additionalKeys?: KeyboardEvent['key'][];
  additionalAction?: () => void;
};

/*
 * handle keydown event for specified keys
 * @param e - KeyboardEvent
 * @param keys - array of keys to listen for
 * @param action - function to be executed
 * @param additionalKeys - array of additional keys to listen for
 * @param additionalAction - function to be executed when additionalKeys are pressed
 */
export const handleKeyDownAction = ({
  e,
  keys,
  action,
  additionalKeys,
  additionalAction,
}: HandleKeyDownActionType) => {
  // prevent default action for space key, like scrolling the page
  if (e.key === ' ') e.preventDefault();

  // execute action if the key pressed (e.key) is in the keys array
  if (keys.includes(e.key)) {
    action();
  }

  // execute additional action if the key pressed (e.key) is in the additionalKeys array
  if (additionalKeys && additionalKeys.includes(e.key) && additionalAction) {
    additionalAction();
  }
};
