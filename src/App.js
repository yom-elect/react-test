import './App.css';
import { ContactModal } from '../src/Components/ContactModal';
// import Counter from './Components/Counter/Counter';

function App() {
  return (
    <div className="App">
      {/* <Counter/> */}
      <ContactModal submit={() => console.log("submit")}/>
    </div>
  );
}

export default App;
