import Center from "@/components/Center";
import Header from "@/components/Header";
import { Box, ColumnsWrapper } from "./cart";

export default function Order()
{
    return(
        <>
        <Header/>
        <Center>
            <ColumnsWrapper>
            <Box>
                <h1>Захиалга өгсөнд баярлалаа!</h1>
                <p>Захиалга замдаа гарах үед холбогдоно.</p>
            </Box>
            </ColumnsWrapper>
        </Center>
        </>
    )
}