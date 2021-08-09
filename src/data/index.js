import { coldarkDark, coldarkCold, atomDark, materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const languages = [
  "CSS", "HTML", "Java", "JavaScript", "JSON", "PHP", "Python", "SQL", "TypeScript", "JSX"
];




export const backgroundColorCircle = [
  'linear-gradient(140deg, rgb(76, 200, 200), rgb(32, 32, 51))',
  'linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))',
  'linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))',
  'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))'
]


export const colors = {
  'atom-dark': atomDark,
  'coldark-cold': coldarkCold,
  'coldark-dark': coldarkDark,
  'material-dark': materialDark,
  'material-light': materialLight
};


export const jsxText = `const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};`;



export const tagsOptions = [
  'CSS', 'Animation', 'Visual', 'Interactivity', 'Layout', 'Hooks', 'Components',
  'Algorithm', 'Array', 'Browser', 'Date', 'Function', 'Math', 'Node', 'Object', 'String',
  'Type', 'API', 'Architecture', 'Artisan', 'Authentication', 'Authorization', 'Blade', 'Breeze', 'Cache',
  'Database', 'Forms', 'Input', 'JavaScript', 'Jetstream', 'Laravel', 'Mail', 'Middleware', 'Notifications'
  , 'Packages', 'React', 'Requests', 'Routing', 'Sail', 'Sanctum', 'Security', 'Session', 'Validation',
  'Vue.js'
];
