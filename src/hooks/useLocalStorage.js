import { useState } from 'react';

const useLocalStorage = (key = '', initialValue = '') => {
  const [state, setstate] = useState(() => localStorage.getItem(key));

  const setLocalStorage = newState => {
    setstate(newState);
    localStorage.setItem(key, newState);
  }

  return [state, setLocalStorage];
};

export default useLocalStorage;