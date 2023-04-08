import './app.css';
import Header from "./components/Header/Header.jsx";

function App() {
    return (
        <div style={{
            color: '#f3f3f3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h1>Welcome to F1 Companion</h1>
            <p>The site is currently under development</p>
            <p>While the data is still available, it is not pretty.</p>
        </div>
    );
}

export default App
