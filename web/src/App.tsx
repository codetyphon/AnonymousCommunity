import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import 'antd/dist/antd.css';
import './App.css'
import Home from './home'
import About from './about'
import Topic from './topic'

function App() {
  return (
    <Layout>
      <Header className="header" style={{ background: '#f0f2f5' }}><div className="logo" /><h1>Community</h1></Header>
      <Content>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic/:id" element={<Topic />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2021 Created by <a href="https://github.com/codetyphon/AnonymousCommunity" target="_blank">AnonymousCommunity</a></Footer>
    </Layout>
  );
}

export default App;
