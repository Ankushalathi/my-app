import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import "./App.css";
import store from "./store";
import PageRoutes from "./PageRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <PageRoutes />
      </ReactFlowProvider>

      <div id="confirmation-container"></div>
    </Provider>
  );
};

export default App;
