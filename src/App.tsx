// import {useContext, useEffect} from "react";
import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CenteredTabs from "./components/NavBar.tsx";
import TagsPage from "./pages/TagsPage.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
          <CenteredTabs/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/tags" element={<TagsPage tags="Character"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
