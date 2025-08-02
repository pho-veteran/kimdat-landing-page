import { Route, Routes } from "react-router";
import Home from "@/pages/home";
import Test from "@/pages/Test";
import ProductsCategories from "@/pages/products-categories";

const AppRoutes = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/san-pham" element={<ProductsCategories />} />
        </Routes>
     );
}
 
export default AppRoutes;