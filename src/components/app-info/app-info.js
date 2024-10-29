import React from 'react';
import './app-info.css';

const AppInfo = (props) => {
  const { dataLength, employees } = props;
  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании N</h1>
      <h2>Общее число сотрудников: {employees}</h2>
      <h2>Премию получат: {dataLength}</h2>
    </div>
  );
};

export default AppInfo;
