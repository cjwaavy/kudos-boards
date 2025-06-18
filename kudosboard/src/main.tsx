import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import BoardPage from './BoardPage.tsx'
import { AppContext } from './AppContext.tsx'
import { useState } from 'react'

const [boards, setBoards] = useState();

createRoot(document.getElementById('root')!).render(
  <AppContext value={ { boards, setBoards } }>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/boards" element={<BoardPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AppContext>
)
