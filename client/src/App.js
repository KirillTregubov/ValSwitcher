// import {} from 'react';
// import AppDump from './pages/AppDump';
import AccountList from './components/AccountList';
import './App.css';
import logo from './assets/images/ValorantLogo.svg';

function App() {
	return (
		<div className="App text-white pt-20">
			<div className="fixed top-0 left-0 w-full z-10 flex items-center justify-center space-x-2 py-6 bg-valblack-dark">
				<img className="block w-44" src={logo} alt="Valorant" />
				<h1 className="text-2xl pt-title font-valorant text-valbeige leading-none">Switcher</h1>
			</div>
			<AccountList />
			
			{/* <div className="inline-block align-bottom bg-valblack-light rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				Hello Everyone
			</div> */}
			
			{/* onClick={testCookies()} */}
			{/* <button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button>
			<button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button> */}
			{/* <AppDump /> */}
		</div >
	);
}

export default App;
