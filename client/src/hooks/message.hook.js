import {useCallback} from 'react';

export const useMessage = () => {
  return useCallback (text => {
      if (window.M && text) {
        window.M.toast({ css: text, image, user._id})
      }
  }, [])
}
