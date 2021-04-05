import "./App.css";
import Header from "./Components/Header/Header";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={2} autoHideDuration={2500}>
        <Header />
      </SnackbarProvider>
    </div>
  );
}

export default App;