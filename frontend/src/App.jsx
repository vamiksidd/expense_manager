
import { HomePage, LoginPage, NotFound, SignUpPage, TransactionPage } from "./pages";
import { Route, Routes } from "react-router-dom";
import { LampContainer } from './components/ui/Lamp.jsx'
import { Header } from "./components/index.js"

function App() {
	const authUser = true;
	return (
		<>


			<LampContainer>
				{authUser && <Header />}
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/transaction/:id' element={<TransactionPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</LampContainer>
		</>
	);
}

export default App;
