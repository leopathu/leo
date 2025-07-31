
import React, { useState, useEffect } from 'react';
import { formStyle, inputStyle, buttonStyle, headingStyle, errorStyle, successStyle } from './formStyles';

const LOCAL_KEY = 'leo_ai_configs';
const FAMOUS_MODELS = [
  { name: 'OpenAI GPT-4', value: 'openai-gpt4' },
  { name: 'Google Gemini', value: 'google-gemini' },
  { name: 'Anthropic Claude', value: 'anthropic-claude' },
  { name: 'Meta Llama', value: 'meta-llama' },
  { name: 'Mistral', value: 'mistral' },
  { name: 'Custom', value: 'custom' }
];

function ConfigPage({ user }) {
  const [models, setModels] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedModel, setSelectedModel] = useState(FAMOUS_MODELS[0].value);
  const [modelName, setModelName] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const allConfigs = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
      setModels(allConfigs[user] || []);
    }
  }, [user]);

  const handleAdd = (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    if (!modelName || !apiToken) {
      setError('Model name and API token required');
      return;
    }
    const newModel = { name: modelName, type: selectedModel, token: apiToken };
    const allConfigs = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    const userModels = allConfigs[user] || [];
    allConfigs[user] = [...userModels, newModel];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(allConfigs));
    setModels(allConfigs[user]);
    setModelName(''); setApiToken(''); setSelectedModel(FAMOUS_MODELS[0].value);
    setMsg('Model added!');
    setShowPopup(false);
  };

  const handleDelete = idx => {
    const allConfigs = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    allConfigs[user] = models.filter((_, i) => i !== idx);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(allConfigs));
    setModels(allConfigs[user]);
  };

  return (
    <div style={{width:'100%', minHeight:'100vh', padding:'32px 40px', boxSizing:'border-box', background:'#1e1e1e'}}>
      <h2 style={{...headingStyle, marginBottom:24}}>AI Model Configuration</h2>
      <button style={{...buttonStyle, marginBottom:20, width:'fit-content'}} onClick={() => setShowPopup(true)}>Add Model</button>
      <div style={{marginTop:10}}>
        <h3 style={{color:'#61dafb'}}>Your Models</h3>
        {models.length === 0 ? <div>No models configured.</div> : (
          <table style={{width:'100%', background:'#23232a', borderRadius:8, borderCollapse:'collapse', marginTop:10, color:'#eaeaea'}}>
            <thead>
              <tr style={{color:'#61dafb', background:'#23232a'}}>
                <th style={{padding:'10px 8px', textAlign:'left'}}>Model</th>
                <th style={{padding:'10px 8px', textAlign:'left'}}>Type</th>
                <th style={{padding:'10px 8px', textAlign:'left'}}>API Token</th>
                <th style={{padding:'10px 8px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr key={i} style={{background:i%2?'#23232a':'#282c34'}}>
                  <td style={{padding:'8px'}}>{m.name}</td>
                  <td style={{padding:'8px'}}>{FAMOUS_MODELS.find(fm=>fm.value===m.type)?.name || m.type}</td>
                  <td style={{padding:'8px', fontFamily:'monospace', color:'#61dafb'}}>{m.token}</td>
                  <td style={{padding:'8px'}}>
                    <button style={{...buttonStyle, background:'#d32f2f', fontSize:'0.9rem', padding:'6px 12px'}} onClick={() => handleDelete(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showPopup && (
        <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(30,30,30,0.7)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{...formStyle, minWidth:340, boxShadow:'0 4px 24px #000', position:'relative'}}>
            <button style={{position:'absolute', top:10, right:10, background:'#23232a', color:'#fff', border:'none', fontSize:'1.2rem', borderRadius:4, cursor:'pointer'}} onClick={()=>setShowPopup(false)}>×</button>
            <h3 style={headingStyle}>Add AI Model</h3>
            <form onSubmit={handleAdd} style={{display:'flex', flexDirection:'column', gap:12}}>
              <label style={{color:'#eaeaea'}}>Famous Models</label>
              <select value={selectedModel} onChange={e=>setSelectedModel(e.target.value)} style={{...inputStyle, fontSize:'1rem'}}>
                {FAMOUS_MODELS.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}
              </select>
              <input
                type="text"
                placeholder="Model Name"
                value={modelName}
                onChange={e => setModelName(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="API Token"
                value={apiToken}
                onChange={e => setApiToken(e.target.value)}
                style={inputStyle}
                required
              />
              <button type="submit" style={buttonStyle}>Save Model</button>
            </form>
            {msg && <div style={successStyle}>{msg}</div>}
            {error && <div style={errorStyle}>{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfigPage;
