import "styles/App.css"
import PCNavBar from 'components/PCNavBar';
import HomePage from 'pages/HomePage';

function App() {
  return (
    <div style={{minHeight:'100vh'}}>
      <PCNavBar/>
      <HomePage/>
    </div>
  );
}

export default App;
