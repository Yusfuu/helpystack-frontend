import React, { createContext, useContext, useState } from 'react';
import { ReactComponent as ExportIcon } from "./icons/export.svg";
import { ReactComponent as PlusIcon } from "./icons/publish.svg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, coldarkCold, atomDark, materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as htmlToImage from 'html-to-image';
import download from "downloadjs";
import './Editor.scss';
import 'antd/dist/antd.css';
import { Select, Input, Popover, message } from 'antd';
import { languages, jsxText, backgroundColorCircle, tagsOptions } from './data';
import { Drawer, Form, Button, Col, Row } from 'antd';
import useLocalStorage from './hooks/useLocalStorage';


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
  const [visible, setvisible] = useState(false)
  const [showControle, setShowControle] = useState(false);
  const [description, setdescription] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [__token__] = useLocalStorage('__token__');

  const typing = (e) => {
    setCode(e.target.value);
  }

  const HandlePublish = async () => {

    if (description.trim() === '' || description.length > 255) {
      message.error('something went wrong akkwrd !');
    } else {

      message.loading({ content: 'Loading...', key: 'updatable' });
      const url = `${process.env.REACT_APP_API_URL}/p/publish`;

      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('code', code);
      formdata.append('background', background ? backgroundcolor : '#fff');
      formdata.append('color', color);
      formdata.append('lang', lang);
      formdata.append('description', description);
      formdata.append('tags', selectedItems.join(','));
      formdata.append('Authorization', __token__);

      const config = {
        method: 'POST',
        body: formdata
      };

      const response = await fetch(url, config);
      const result = await response.json();
      if (result !== null) {
        message.success({ content: 'Your Snippet is published !', key: 'updatable', duration: 2 });
        setvisible(false);
        setdescription('');
      } else {
        message.error('something went wrong akkwrd !');
      }

    }

  }

  return (
    <EditorContext.Provider value={{ setSelectedItems, selectedItems, setvisible, showControle, setShowControle, backgroundcolor, setBackgroundColor, name, setName, colorTheme, setcolorTheme, color, setColor, lang, setLang, darkmode, setDarkmode, background, setBackground, code }}>
      <div className={darkmode ? 'dark' : 'light'} style={{
        display: 'flex',
        flexDirection: 'row-reverse'
      }}>
        <div className="text-editor" style={{ flex: '.8' }}>
          <TextArea showCount allowClear value={code} maxLength={1000} onChange={typing} autoFocus className="textareaTyping" rows={18} style={{ borderRadius: '5px' }} />
          <div className="highlite" style={{ background: background ? backgroundcolor : '#fff' }}>
            <div className="app-header-frame">
              <div className="frame-controls">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="title">
                <input style={{ width: '50%' }} onChange={(e) => setName(e.target.value)} type="text" value={name} />
              </div>
            </div>
            <SyntaxHighlighter id="syntaxHighlighterCode" language={lang.toLowerCase()} style={colorTheme} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
        <Controls />
      </div>
      <Drawer
        title="Create a new Tip"
        width={720}
        onClose={() => setvisible(false)}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button onClick={() => setvisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              disabled={description.trim() === '' || description.length >= 255 || selectedItems.length < 1}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px'
              }} onClick={HandlePublish} type="primary" htmlType="submit">
              <PlusIcon />
              Publish
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter description',
                  },
                ]}
                initialValue={description}

              >
                <Input.TextArea onChange={(e) => setdescription(e.target.value)} showCount allowClear maxLength={255} rows={4} placeholder="please enter description" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="tags"
                label="Tags"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TagsOption />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </EditorContext.Provider>
  )
}



function TagsOption() {
  const { setSelectedItems, selectedItems } = useContext(EditorContext);
  const handleChange = selectedItems => {
    setSelectedItems(selectedItems);
  }
  const filteredOptions = tagsOptions.filter(o => !selectedItems.includes(o));
  return (
    <Select
      allowClear
      mode="multiple"
      placeholder="Tags ..."
      value={selectedItems}
      onChange={handleChange}
      style={{ width: '100%' }}
    >
      {filteredOptions.map(item => <Select.Option disabled={selectedItems.length > 2} key={item} value={item}>{item}</Select.Option>)}
    </Select>
  );
}
function Controls() {
  const { backgroundcolor, setBackgroundColor, setcolorTheme, color, setColor, lang, setLang, darkmode, setDarkmode, background, setBackground } = useContext(EditorContext);

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
    <div className='controls'>
      <div className="form-setting">
        <span>Colors</span>
        <Select dropdownStyle={{ color: 'red' }} defaultValue={color} style={{ width: 200 }} onChange={handleChange}>
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
      <Publish />
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

  return (
    <Popover content={Content}>
      <button className="export">
        <span>Export</span>
        <ExportIcon />
      </button>
    </Popover>
  );
}

function Publish() {
  const { setvisible } = useContext(EditorContext);

  return (
    <>
      <button onClick={() => setvisible(true)} className="export" style={{ backgroundColor: '#60d360', }}>
        <span style={{ color: '#fff' }}>Publish</span>
        <PlusIcon style={{ fill: '#fff' }} />
      </button>
    </>
  );
}

export default Editor;
