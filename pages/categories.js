import CategoriesGrid from "@/components/CategoriesGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function CategoriesPage({products,categories}){
    return (
        <>
         <Header/>
         <Center>
         {categories?.length > 0 && categories.map(category => (
                <CategoriesGrid 
                key={category._id} 
                category={category} 
                products={products.filter(product => 
                    product.category === category._id.toString()
                )}/>
            ))}
         </Center>


 
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect();
    const products = await Product.find({},null,{sort:{'_id':-1}});
    const categories = await Category.find();
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            categories: JSON.parse(JSON.stringify(categories)),
        }
    };
}