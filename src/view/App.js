import React from 'react';
import Sidebar from './sidebar/Sidebar.js'
import Listener from './Listener.js'
import Content from './Content.js'
import './App.css';


const App = () => (
<div className="App">
	<Sidebar/>
	<Content/>
	<Listener/> 
</div>
)



export default App;
