import './App.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Adopt from './comp/Adoptt';
import Home from './comp/Home';
import GlobalStyles from "./GlobalStyles";
import CustomMap from './comp/CustomMap';
import Chat from './comp/Chat';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles/>
      <main>
        <Routes>
          <Route path="/chat" element={<Chat/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/kakao" element={<CustomMap/>} />
          <Route path="/adopt" element={<Adopt/>} />
        </Routes>
      </main>

      <footer>
        <div className='foot'>
          <nav>
            <Link to="/chat">게시글</Link>
            <Link to="/kakao">지도</Link>
            <Link to="/">Home</Link>
            <Link to="/adopt">입양</Link>
            {/* <Link to="/">마이페이지</Link> */}
          </nav>
        </div>
      </footer>

    </BrowserRouter>
  );
}

export default App;
