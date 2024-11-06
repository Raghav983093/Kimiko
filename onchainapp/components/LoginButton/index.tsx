import WalletComponent from "../WalletComponent";

export default function LoginButton() {
    return(
        <WalletComponent
            className="min-w-[90px]"
            text="Log in"
            withWalletAggregator={true}
        />
    );
}
