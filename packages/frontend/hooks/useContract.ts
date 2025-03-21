import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import UsdcArtifact from "../utils/USDCToken.json";
import JoeArtifact from "../utils/USDCToken.json";
import AmmArtifact from "../utils/AMM.json";
import { USDCToken as UsdcContractType } from "../typechain-types";
import { JOEToken as JoeContractType } from "../typechain-types";
import { AMM as AmmContractType } from "../typechain-types";
import { getEthereum } from "../utils/ethereum";

// 自分でコントラクトをデプロイした場合は、この3つの値を書き換える。
export const UsdcAddress = "0x3815febBf609F5a01deB506679cCfFf8bF4efD4B";
export const JoeAddress = "0xabD4fA779aAf42d2fee9d321Cd1Fce8174311468";
export const AmmAddress = "0x180DB38AF140d2fC3aA99BC13D1E3B3fD30EcFc9";

export type TokenType = {
  symbol: string;
  contract: UsdcContractType | JoeContractType;
};

export type AmmType = {
  sharePrecision: BigNumber;
  contract: AmmContractType;
};

type ReturnUseContract = {
  usdc: TokenType | undefined;
  joe: TokenType | undefined;
  amm: AmmType | undefined;
};

/**
 * useContract Hook
 * @param currentAccount
 * @returns
 */
export const useContract = (
  currentAccount: string | undefined
): ReturnUseContract => {
  const [usdc, setUsdc] = useState<TokenType>();
  const [joe, setJoe] = useState<TokenType>();
  const [amm, setAmm] = useState<AmmType>();
  // get ethereum instance
  const ethereum = getEthereum();

  /**
   * getContract function
   * @param contractAddress
   * @param abi
   * @param storeContract
   * @returns
   */
  const getContract = (
    contractAddress: string,
    abi: ethers.ContractInterface,
    storeContract: (_: ethers.Contract) => void
  ) => {
    if (!ethereum) {
      console.log("Ethereum object doesn't exist!");
      return;
    }

    if (!currentAccount) {
      console.log("currentAccount doesn't exist!");
      return;
    }

    try {
      // @ts-ignore: ethereum as ethers.providers.ExternalProvider
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      // コントラクトインスタンスを作成してステート変数に詰める。
      const Contract = new ethers.Contract(contractAddress, abi, signer);
      storeContract(Contract);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * generateUsdc
   * @param contract
   */
  const generateUsdc = async (contract: UsdcContractType) => {
    try {
      const symbol = await contract.symbol();
      setUsdc({ symbol: symbol, contract: contract } as TokenType);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * generateJoe
   * @param contract
   */
  const generateJoe = async (contract: UsdcContractType) => {
    try {
      const symbol = await contract.symbol();
      setJoe({ symbol: symbol, contract: contract } as TokenType);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * generateAmm
   * @param contract
   */
  const generateAmm = async (contract: AmmContractType) => {
    try {
      const precision = await contract.PRECISION();
      setAmm({ sharePrecision: precision, contract: contract } as AmmType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // それぞれスマートコントラクト用のインスタンスを生成する。
    getContract(UsdcAddress, UsdcArtifact.abi, (Contract: ethers.Contract) => {
      generateUsdc(Contract as UsdcContractType);
    });
    getContract(JoeAddress, JoeArtifact.abi, (Contract: ethers.Contract) => {
      generateJoe(Contract as JoeContractType);
    });
    getContract(AmmAddress, AmmArtifact.abi, (Contract: ethers.Contract) => {
      generateAmm(Contract as AmmContractType);
    });
  }, [ethereum, currentAccount]);

  return {
    usdc,
    joe,
    amm,
  };
};
