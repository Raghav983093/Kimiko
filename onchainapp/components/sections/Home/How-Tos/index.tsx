import Box from "@mui/material/Box";

export const HowTos = () => {
    return(
        <Box className="w-full flex justify-between items-center gap-4 ">
            <button className="howToButton" >
                <img 
                    src={"/shoppingapp.svg"}
                    alt={"shoppingapp"}
                    className="object-cover h-10 w-10"
                />
                How-to-buy
            </button>
            <button className="howToButton">
                <img 
                    src={"/emptycart.svg"}
                    alt={"shoppingapp"}
                    className="object-cover h-10 w-10"

                />
                How-to-sell
            </button>
        </Box>
    );
} 