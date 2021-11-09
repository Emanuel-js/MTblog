import React from 'react';
import {Admin,Resource} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import BlogList from './components/BlogList'

const dataProvider = simpleRestProvider('http://localhost:3000');


const App = () => (
    <Admin dataProvider={simpleRestProvider(dataProvider)}>
        <Resource name="Blogs" list={BlogList} />        
  </Admin>
);


export default App;
