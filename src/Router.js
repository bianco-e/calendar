import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App} />
    </BrowserRouter>
  );
}
