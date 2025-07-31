import React from 'react';
import { FaRegFolder, FaSearch, FaUser, FaCog } from 'react-icons/fa';
import './VSCodeLayout.css';

const Sidebar = ({ onSelect, selected }) => (
  <div className="vsc-sidebar">
    <button className={selected==='explorer' ? 'active' : ''} onClick={() => onSelect('explorer')}><FaRegFolder /></button>
    <button className={selected==='search' ? 'active' : ''} onClick={() => onSelect('search')}><FaSearch /></button>
    <button className={selected==='user' ? 'active' : ''} onClick={() => onSelect('user')}><FaUser /></button>
    <button className={selected==='settings' ? 'active' : ''} onClick={() => onSelect('settings')}><FaCog /></button>
  </div>
);

const TopBar = () => (
  <div className="vsc-topbar">
    <span className="vsc-title">leo - VSCode UI</span>
  </div>
);

const VSCodeLayout = ({ children, selected, onSelect }) => (
  <div className="vsc-root">
    <Sidebar onSelect={onSelect} selected={selected} />
    <div className="vsc-main">
      <TopBar />
      <div className="vsc-content">{children}</div>
    </div>
  </div>
);

export default VSCodeLayout;
