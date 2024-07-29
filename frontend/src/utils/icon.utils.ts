type getAdaptableSizeProps = {
  originalHeight: number;
  originalWidth: number;
  currentWidth: number | undefined;
};

type getAdaptableSizeResponse = {
  h: number | undefined;
  w: number | undefined;
};

/**
 * According the initial size of the icon and the width wanted we adapt the current icon size
 * @param originalHeight - initial height
 * @param originalWidth - initial width
 * @param currentWidth - wanted width
 * @returns
 */
export const getAdaptableSize = ({
  originalHeight,
  originalWidth,
  currentWidth,
}: getAdaptableSizeProps): getAdaptableSizeResponse => {
  if (originalWidth <= 0) {
    return { h: undefined, w: undefined };
  }

  const ratio = originalHeight / originalWidth;
  const w = Number(currentWidth) || originalWidth;
  const h = w * ratio + 1;

  return {
    h,
    w,
  };
};
