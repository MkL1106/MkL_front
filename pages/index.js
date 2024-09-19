import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Settings } from "@/models/Settings";

export default function HomePage({featuredProduct,newProducts}){
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  // Fetch the settings data to get the featuredProductId
  const settings = await Settings.findOne(); // Assuming there's only one settings document
  const featuredProductId = settings?.product; // Extract product from settings

  // Fetch the featured product using the featuredProductId
  const featuredProduct = await Product.findById(featuredProductId);
  
  // Fetch the new products as you did before
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}