import { MetaMaskInpageProvider } from "@metamask/providers";

// window に ethereum を追加します。
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

/**
 * ブラウザからMetamaskのオブジェクトを取得するメソッド
 * @returns
 */
export const getEthereum = (): MetaMaskInpageProvider | null => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const { ethereum } = window;
    return ethereum;
  }
  return null;
};
