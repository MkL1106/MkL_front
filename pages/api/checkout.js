import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

export default async function handler(req,res){
    if(req.method !== 'POST'){
        res.json('should be a POST request');
        return;
    }
    const {
        phoneNumber,duureg,horoo,
        hothon,bair,orts,
        floor,toot,code,cartProducts,} = req.body;
    await mongooseConnect();
    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)];
    const productsInfos = await Product.find({_id:uniqueIds});
    
    let line_items = [];
    for(const productId of uniqueIds){
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if(quantity > 0 && productInfo){
            line_items.push({
                quantity,
                price_data : {
                    currency: 'MNT',
                    product_data: {name:productInfo.title},
                    unit_amount: quantity * productInfo.price,
                },
            });
        }
    }
    
    const orderDoc = await Order.create({
        line_items,phoneNumber,duureg,horoo,
        hothon,bair,orts,
        floor,toot,code,
    });

    res.status(200).json(orderDoc);
}