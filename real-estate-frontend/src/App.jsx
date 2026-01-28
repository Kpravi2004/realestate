import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyMultiStepForm from "./pages/PropertyMultiStepForm";
import PropertyDetail from "./pages/PropertyDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertyMultiStepForm />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
