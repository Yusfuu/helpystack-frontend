import { useState } from 'react';

const useForm = () => {
  const [fields, setFields] = useState({});

  const handleField = event => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value.trim() });
  }
  return { handleField, fields };
}

export default useForm;
