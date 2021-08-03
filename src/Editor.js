import React, { createContext, useContext, useState } from 'react';
import { ReactComponent as ExportIcon } from "./icons/export.svg";
import { ReactComponent as FlexWidget } from "./icons/flexe.svg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, coldarkCold, atomDark, materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as htmlToImage from 'html-to-image';
import download from "downloadjs";
import './Editor.css';
import 'antd/dist/antd.css';
import { Select, Input, Popover } from 'antd';
import { languages, jsxText, backgroundColorCircle } from './data';


const { Option } = Select;
const { TextArea } = Input;

const EditorContext = createContext();




const colors = {
  'atom-dark': atomDark,
  'coldark-cold': coldarkCold,
  'coldark-dark': coldarkDark,
  'material-dark': materialDark,
  'material-light': materialLight
};



function Editor() {
  const [code, setCode] = useState(jsxText);
  const [darkmode, setDarkmode] = useState(false);
  const [background, setBackground] = useState(true);
  const [backgroundcolor, setBackgroundColor] = useState(backgroundColorCircle[0]);
  const [color, setColor] = useState('atom-dark');
  const [colorTheme, setcolorTheme] = useState(atomDark);
  const [lang, setLang] = useState('jsx');
  const [name, setName] = useState('Untitled-1');

  const [showControle, setShowControle] = useState(false);

  const typing = (e) => {
    setCode(e.target.value.trim());
  }

  return (
    <div>
      <EditorContext.Provider value={{ showControle, setShowControle, backgroundcolor, setBackgroundColor, name, setName, colorTheme, setcolorTheme, color, setColor, lang, setLang, darkmode, setDarkmode, background, setBackground, code }}>
        <div className="text-editor">
          <TextArea allowClear showCount value={code} maxLength={1000} onChange={typing} autoFocus className="textareaTyping" rows={18} />
          <Controls />
          <div className="highlite" style={{ background: background ? backgroundcolor : '#fff' }}>
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
            <SyntaxHighlighter id="syntaxHighlighterCode" language={lang.toLowerCase()} style={colorTheme} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
        {/* <Controls /> */}
        <EditButton />
      </EditorContext.Provider>
    </div >
  )
}


function EditButton() {
  const { showControle, setShowControle } = useContext(EditorContext);

  return (
    <div className="fixed-widgets" onClick={() => setShowControle(!showControle)}>
      <span className="avatar">
        <FlexWidget />
      </span>
    </div>
  );
}

function Controls() {
  const { showControle, backgroundcolor, setBackgroundColor, setcolorTheme, color, setColor, lang, setLang, darkmode, setDarkmode, background, setBackground } = useContext(EditorContext);

  const onChange = (value) => {
    setLang(value);
  }

  const handleChange = (value) => {
    setColor(value);
    setcolorTheme(colors[value]);
  }

  const handlebackgroundcolor = (value) => {
    setBackgroundColor(value);
  }
  return (
    <div className={`controls ${darkmode ? 'dark' : 'light'}`} style={{ transform: showControle ? 'translateX(-50%)' : 'translateX(-200%)' }}>
      <div className="form-setting">
        <span>Colors</span>
        <Select dropdownStyle={{ color: 'red' }} defaultValue={color} style={{ width: 200, background: 'black' }} onChange={handleChange}>
          {Object.keys(colors).map((e, idx) => <Option key={idx} value={e}>{e}</Option>)}
        </Select>
      </div>
      <div className="form-setting">
        <span>Background</span>
        <Toggle state={background} setState={setBackground} name="toggleBackground" />
      </div>
      <div className="form-setting">
        <span>Dark mode</span>
        <Toggle state={darkmode} setState={setDarkmode} name="toggleDark" />
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

      <div className="form-setting">
        <span>Theme</span>
        <Select defaultValue={backgroundcolor} style={{ width: 65 }} className="backgroundcolor-selector" onChange={handlebackgroundcolor} disabled={!background}>
          {backgroundColorCircle.map((e, idx) => <Option value={e} key={idx}><div className="circleColor" style={{ background: e }}></div></Option>)}
        </Select>
      </div>
      <Export />
    </div >
  )
}


function Toggle({ state, setState, name }) {
  return (
    <div className="toggleWrapper">
      <input onClick={() => setState(!state)} type="checkbox" name={name} className="mobileToggle" id={name} defaultChecked={state} />
      <label htmlFor={name} id="toggleBg"></label>
    </div>
  );
}

function Content() {
  const { name } = useContext(EditorContext);

  const handleExportPNG = () => {
    htmlToImage.toPng(document.querySelector('.highlite'))
      .then((dataUrl) => download(dataUrl, name));
  }

  const handleExportSVG = () => {
    htmlToImage.toSvg(document.querySelector('.highlite'))
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = name;
        link.href = dataUrl;
        link.click();
      });
  }

  return (
    <div>
      <p onClick={handleExportPNG}>Save PNG</p>
      <p onClick={handleExportSVG}>Save SVG</p>
    </div>
  );

};


function Export() {
  const { name, code, darkmode, background, backgroundcolor, color, lang } = useContext(EditorContext);


  const handleExport = () => {
    const saveSnippet = JSON.stringify({
      name, code, darkmode, background, backgroundcolor, color, lang
    }).length;

    console.log(saveSnippet);

  }

  return (
    <Popover content={Content}>
      <button className="export" onClick={handleExport}>
        <span>Export</span>
        <ExportIcon />
      </button>
    </Popover>
  );
}



export default Editor;
