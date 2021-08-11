import { useEffect, useState } from "react";

// const getOnlineStatus = () => navigator.onLine;

// const useNavigatorOnline = () => {
//   const [status, setStatus] = useState(getOnlineStatus());

//   useEffect(() => {
//     window.addEventListener('online', () => setStatus(true));
//     window.addEventListener('offline', () => setStatus(false));

//     return () => {
//       window.addEventListener('online', () => setStatus(true));
//       window.addEventListener('offline', () => setStatus(false));
//     };
//   }, []);

//   return status;
// };

// export default useNavigatorOnline;
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;

const useNavigatorOnLine = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};

export default useNavigatorOnLine;