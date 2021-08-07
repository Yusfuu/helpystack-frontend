import { useEffect, useState, useRef } from 'react';

const useIO = () => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new IntersectionObserver(([entry]) => updateEntry(entry), {
      threshold: 1.0
    })
  );

  useEffect(() => {
    const { current } = observer;
    current.disconnect();
    if (node) current.observe(node);
    return () => current.disconnect();
  }, [node]);

  return [setNode, entry.isIntersecting];
}

export default useIO;
