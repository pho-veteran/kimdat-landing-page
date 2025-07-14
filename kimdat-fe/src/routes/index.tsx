import { Route, Routes } from "react-router";
import Test from "@/pages/Test";

const AppRoutes = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Test />} />
        </Routes>
     );
}
 
export default AppRoutes;