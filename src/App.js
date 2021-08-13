import './App.css';
import Header from './components/header/Header';
import NotesList from './components/noteslist/NotesList';

function App() {

  return (
    <div className="app">
      <Header />
      <NotesList/>
    </div>
  );
}

export default App;
