import React from 'react';
import StatusCheckboxGroup from './components/StatusCheckboxGroup';
import './App.css';

/**
 * 应用主组件
 * 只展示状态复选框组件
 */
const App: React.FC = () => {
  return (
    <div 
      className="App" 
      style={{ 
        padding: "60px 40px",
        minHeight: "100vh",
        backgroundColor: "#f9fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        boxSizing: "border-box"
      }}
    >
      {/* 只保留组件实例 */}
      <main style={{ 
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px"
      }}>
        <StatusCheckboxGroup />
      </main>
    </div>
  );
};

export default App;