import styled from "styled-components";
import dynamic from "next/dynamic";
import Image, { ImageProps } from "next/image";
const TradeIcon = dynamic(() => import("../assets/svg-file/trade"));
const EarnIcon = dynamic(() => import("../assets/svg-file/earn"));
const CombinedIcon = dynamic(() => import("../assets/svg-file/combined"));
// const AdaIcon = dynamic(() => import("../assets/svg-file/ada"));
// const AvaxIcon = dynamic(() => import("../assets/svg-file/avax"));
const BtcIcon = dynamic(() => import("../assets/svg-file/btc"));
const EthIcon = dynamic(() => import("../assets/svg-file/eth"));
const LogoIcon = dynamic(() => import("../assets/svg-file/logo"));
const WalletIcon = dynamic(() => import("../assets/svg-file/wallet"));
const MetamaskIcon = dynamic(() => import("../assets/svg-file/metamask"));
const TrustIcon = dynamic(() => import("../assets/svg-file/trust"));
interface IconProps extends ImageProps {
    src: any;
}

const getIcon = (src: string) => {
    switch (src?.toLowerCase()) {
        case "trade":
            return TradeIcon;
        case "earn":
            return EarnIcon;
        case "wallet":
            return WalletIcon;
        case "combined":
            return CombinedIcon;
        // case "ada":
        //     return AdaIcon;
        // case "avax":
        //     return AvaxIcon;
        case "btc":
            return BtcIcon;
        case "eth":
            return EthIcon;
        case "logo":
            return LogoIcon;
        case "metamask":
            return MetamaskIcon;
        case "trust":
            return TrustIcon;
        default:
            return TradeIcon;
    }
};

export function Icon({ src = "", ...restProps }: IconProps) {
    const CustomIcon: any = typeof src === "string" ? getIcon(src) : src;
    return typeof src === "string" ? (
        <CustomIcon
            {...restProps}
            style={restProps?.width && restProps?.height && { width: restProps?.width, height: restProps?.height }}
        />
    ) : (
        <Image {...restProps} src={src} />
    );
}
