import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Favorites from 'pages/Favorites/Favorites';
import PhonebookPages from 'pages/PhonebookPages/PhonebookPages';
import Layout from './Layout/Layout';

const App = () => {
  return (
   <Layout>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/phonebook" element={<PhonebookPages />} />
      </Routes>
   </Layout>
  );
};

export default App;
