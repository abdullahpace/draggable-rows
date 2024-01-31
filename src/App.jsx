import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/Table';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Table />
    </>
  );
}

export default App;
