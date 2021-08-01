import React, { createContext, useContext, useState } from 'react';
import { ReactComponent as ExportIcon } from "./icons/export.svg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, coldarkCold, atomDark, materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg } from 'html-to-image';
import download from "downloadjs";
import './Editor.css';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';



const { Option } = Select;
const { TextArea } = Input;

const EditorContext = createContext();

const languages = [
  "CSS", "HTML", "Java", "JavaScript", "JSON", "PHP", "Python", "SQL", "TypeScript",
]
const colors = {
  'atom-dark': atomDark,
  'coldark-cold': coldarkCold,
  'coldark-dark': coldarkDark,
  'material-dark': materialDark,
  'material-light': materialLight
};



function Editor() {
  const [code, setCode] = useState('');
  const [darkmode, setDarkmode] = useState(false);
  const [background, setBackground] = useState(false);
  const [color, setColor] = useState('atom-dark');
  const [colorTheme, setcolorTheme] = useState(atomDark);
  const [lang, setLang] = useState('javaScript');
  const [name, setName] = useState('Untitled-1');

  const typing = (e) => {
    setCode(e.target.value.trim());
  }

  return (
    <div>
      <EditorContext.Provider value={{ name, setName, colorTheme, setcolorTheme, color, setColor, lang, setLang, darkmode, setDarkmode, background, setBackground }}>
        <div className="text-editor">
          <TextArea allowClear showCount maxLength={1000} onChange={typing} autoFocus className="textareaTyping" rows={18} />
          <div className="highlite">
            <div className="app-header-frame">
              <div className="frame-controls">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="title">
                <input onChange={(e) => setName(e.target.value.trim())} type="text" value={name} />
              </div>
            </div>
            <SyntaxHighlighter language={lang.toLowerCase()} style={colorTheme} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
        {/* <Controls /> */}
      </EditorContext.Provider>
    </div>
  )
}

function Controls() {
  const { setcolorTheme, color, setColor, lang, setLang, darkmode, setDarkmode, background, setBackground } = useContext(EditorContext);

  const onChange = (value) => {
    setLang(value);
  }

  const handleChange = (value) => {
    setColor(value);
    setcolorTheme(colors[value]);
  }

  return (
    <div className={`controls ${darkmode ? 'dark-mode' : ''}`} >
      <div className="form-setting">
        <span>Colors</span>
        <Select defaultValue={color} style={{ width: 200 }} onChange={handleChange}>
          {Object.keys(colors).map((e, idx) => <Option key={idx} value={e}>{e}</Option>)}
        </Select>
      </div>
      <div className="form-setting">
        <span>Dark mode</span>
        <Toggle state={darkmode} setState={setDarkmode} name="toggleBackground" />
      </div>
      <div className="form-setting">
        <span>Background</span>
        <Toggle state={background} setState={setBackground} name="toggleDark" />
      </div>
      <div className="form-setting">
        <span>Language</span>
        <Select showSearch
          style={{ width: 200 }}
          placeholder="Auto-Detect"
          optionFilterProp="children"
          onChange={onChange}
          value={lang}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {languages.map((e, idx) => <Option key={idx} value={e}>{e}</Option>)}

        </Select>

      </div>
      <Export />
    </div >
  )
}


function Toggle({ state, setState, name }) {
  return (
    <div className="toggleWrapper">
      <input onClick={() => setState(!state)} type="checkbox" name={name} className="mobileToggle" id={name} />
      <label htmlFor={name} id="toggleBg"></label>
    </div>
  );
}





function Export() {
  const { name, setName } = useContext(EditorContext);

  const handleExport = () => {
    htmlToImage.toPng(document.querySelector('.highlite'))
      .then((dataUrl) => download(dataUrl, name));
  }
  return (
    <button className="export" onClick={handleExport}>
      <span>Export</span>
      <ExportIcon />
    </button>
  );
}



export default Editor;
