import React, { useState } from 'react';
import NotePage from './pages/NotePage';

import PhonebookPage from './pages/PhonebookPage';


export function App() {
  const [page, setPage] = useState('PhonebookPage');

  return (
    <div className="App">
      {page === 'PhonebookPage' && <PhonebookPage />}
      {page === 'NotePage' && <NotePage />}
    </div>
  );
}

export default App;
