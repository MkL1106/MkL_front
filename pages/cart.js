import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px){
         display: grid;
        grid-template-columns: 1.3fr .8fr;
    }
    gap: 40px;
    margin-top: 40px; 
`;

export const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 70px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width: 60px;
        max-height: 60px;
    }
    @media screen and (min-width: 768px){
        padding: 10px;
        width: 100px;
        height: 100px;
        img {
        max-width: 80px;
        max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display:block;
  @media screen and (min-width: 768px){
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [horoo, sethoroo] = useState('');
    const [duureg, setDuureg] = useState('');
    const [floor, setFloor] = useState('');
    const [toot, setToot] = useState('');
    const [bair, setBair] = useState('');
    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hothon, setHothon] = useState('');
    const [orts, setOrts] = useState('');
    const [goToOrder, setGoToOrder] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    async function doOrder(){
        await axios.post('/api/checkout', {
            phoneNumber,duureg,horoo,hothon,bair,orts,floor,toot,code,cartProducts,
        });
        setGoToOrder(true);
    }
    
    if(goToOrder){
        router.push('/order');
        clearCart();
        setGoToOrder(false);
    }
    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Сагс</h2>
                        {!cartProducts?.length && (
                            <div>Таны сагс хоосон байна</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Бүтээгдэхүүн</th>
                                        <th>Тоо Ширхэг</th>
                                        <th>Үнэ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} />
                                                </ProductImageBox>

                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button
                                                    onClick={() => lessOfThisProduct(product._id)}>
                                                    -
                                                </Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button
                                                    onClick={() => moreOfThisProduct(product._id)}>
                                                    +
                                                </Button>
                                            </td>
                                            <td>{(cartProducts.filter(id => id === product._id).length
                                                * product.price).toLocaleString()}₮</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>{total.toLocaleString()}₮</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Захиалагчийн мэдээлэл</h2>
                                <Input
                                    type="text"
                                    placeholder="Утасны дугаар"
                                    value={phoneNumber}
                                    name="phoneNumber"
                                    onChange={ev => setPhoneNumber(ev.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Дүүрэг"
                                    value={duureg}
                                    name="duureg"
                                    onChange={ev => setDuureg(ev.target.value)}
                                />
                                <Input
                                        type="text"
                                        placeholder="Хороо"
                                        value={horoo}
                                        name="horoo"
                                        onChange={ev => sethoroo(ev.target.value)}
                                    />
                                <Input
                                    type="text"
                                    placeholder="Хотхон, Хороолол"
                                    value={hothon}
                                    name="hothon"
                                    onChange={ev => setHothon(ev.target.value)}
                                />
                                <CityHolder>
                                <Input
                                    type="text"
                                    placeholder="Байр"
                                    value={bair}
                                    name="bair"
                                    onChange={ev => setBair(ev.target.value)}
                                />
                                <Input
                                        type="text"
                                        placeholder="Орц"
                                        value={orts}
                                        name="orts"
                                        onChange={ev => setOrts(ev.target.value)}
                                />
                                <Input
                                        type="text"
                                        placeholder="Давхар"
                                        value={floor}
                                        name="floor"
                                        onChange={ev => setFloor(ev.target.value)}
                                    />
                                </CityHolder>
                                <CityHolder>
                                    
                                    <Input
                                        type="text"
                                        placeholder="Тоот"
                                        value={toot}
                                        name="toot"
                                        onChange={ev => setToot(ev.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Орцны код"
                                        value={code}
                                        name="code"
                                        onChange={ev => setCode(ev.target.value)}
                                    />
                                </CityHolder>
                                <Button $black $block onClick={doOrder}>Захиалах</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
