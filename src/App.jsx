import { useRoutes } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import useDataContext from "./utils/hooks/useDataContext";
import Loader from "./Components/Loader/Loader";

function App() {
  const { fileLoading, uploadProgress, setUploadProgress } = useDataContext();
  const pages = useRoutes(Routes);

  return (
    <div>
      {fileLoading ? (
        <>
          <div className="Loader ">
            <Loader fileLoading={fileLoading} />
          </div>
        </>
      ) : (
        pages
      )}
    </div>
  );
}

export default App;
