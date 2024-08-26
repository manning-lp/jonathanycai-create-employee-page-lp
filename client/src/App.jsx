import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Employee } from "./components/Employee";
import { Header } from "./components/Header";
import { SearchResults } from "./components/SearchResults";
import { Loading } from "./components/Loading";

function App() {
  return (
    <>
      <Header />
      <Loading />
      <Container pt="6" maxW="container.md">
        <Routes>
          <Route path="employees/:id" element={<Employee />} />
          <Route path="/" element={<SearchResults />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;