import { Route, Routes } from "react-router";
import Home from "@/pages/home";
import Test from "@/pages/Test";

const AppRoutes = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
        </Routes>
     );
}
 
export default AppRoutes;