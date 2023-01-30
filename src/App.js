import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { Component } from 'react' //rcc class based component snippets
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  pageSize=18;
  render() {
    return (  
      <BrowserRouter>
          <div>
          <Navbar/>          
          <Routes>
              <Route path="/" element={<News key="General" pageSize={this.pageSize} country="in" category="General"/>}/>
              <Route path="/General" element={<News key="General" pageSize={this.pageSize} country="in" category="General"/>}/>
              <Route path="/Business" element={<News key="Business" pageSize={this.pageSize} country="in" category="Business"/>}/>
              <Route path="/Entertainment" element={<News key="Entertainment" pageSize={this.pageSize} country="in" category="Entertainment"/>}/>
              <Route path="/Health" element={<News key="Health" pageSize={this.pageSize} country="in" category="Health"/>}/>
              <Route path="/Science" element={<News key="Science" pageSize={this.pageSize} country="in" category="Science"/>}/>
              <Route path="/Sports" element={<News key="Sports" pageSize={10} country="in" category="Sports"/>}/>
              <Route path="/Technology" element={<News key="Technology" pageSize={this.pageSize} country="in" category="Technology"/>}/>
          </Routes>
          </div>
        </BrowserRouter>
      
    )
  }
}