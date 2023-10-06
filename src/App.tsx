import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TambahPeminjaman from "./layouts/tambahPeminjaman";
import Books from "./layouts/books";
import Peminjaman from "./layouts/peminjaman";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/peminjaman" element={<Peminjaman />} />
              <Route path="/tambah-peminjaman" element={<TambahPeminjaman />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
