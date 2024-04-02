import logo from './logo.svg';
import './App.css';
import StockDataTable from './StockDataTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stocks Frontend App</h1>
      </header>
      <main>
        <h2>Stock Data refreshing every 5 sec. Server calculations done every 30 min.</h2>
        <StockDataTable />
      </main>
    </div>
  );
}

export default App;
