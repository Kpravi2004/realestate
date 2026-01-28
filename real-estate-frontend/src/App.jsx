import Login from "./login";
import Register from "./Register";
import PropertyList from "./PropertyList";
import UploadProperty from "./UploadProperty";
import PredictPrice from "./PredictPrice";

function App() {
  return (
    <div>
      <h1>Real Estate MVP</h1>
      <Register />
      <Login />
      <UploadProperty />
      <PropertyList />
      <PredictPrice />
    </div>
  );
}

export default App;
