import React from 'react';
const newtons_cradle_dot: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '25%',
  transformOrigin: 'center top',
};
const LoadingIcon: React.FC = () => {
  return (
    <div className="newtons-cradle-container">
      <div
        className="newtons-cradle"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90px',
          height: '90px',
        }}
      >
        <div className="newtons-cradle__dot" style={newtons_cradle_dot}></div>
        <div className="newtons-cradle__dot" style={newtons_cradle_dot}></div>
        <div className="newtons-cradle__dot" style={newtons_cradle_dot}></div>
        <div className="newtons-cradle__dot" style={newtons_cradle_dot}></div>
      </div>
    </div>
  );
};

export default LoadingIcon;
