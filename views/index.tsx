import React from "react";

type parms = {
  name?: string;
};

const App: React.FC<parms> = ({ name }) => {
  return <div>Hello {name}</div>;
};

export default App;
