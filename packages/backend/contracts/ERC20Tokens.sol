// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * 検証用のデプロイする USDCトークン
 * ※ 出回っているUSDCと異なり価値が無いので注意すること
 */
contract USDCToken is ERC20 {
  /**
   * コンストラクター
   */
  constructor() ERC20("USDC Token", "USDC") {
    _mint(msg.sender, 10000 ether);
  }

  /**
   * 検証用の任意のアドレスにトークンを発行するメソッド
   */
  function faucet(address recipient, uint256 amount) external {
    _mint(recipient, amount);
  }
}

/**
 * 検証用のデプロイするJOEトークン
 */
contract JOEToken is ERC20 {
  /**
   * コンストラクター
   */
  constructor() ERC20("JOE Token", "JOE") {
    _mint(msg.sender, 10000 ether);
  }

  /**
   * 検証用の任意のアドレスにトークンを発行するメソッド
   */
  function faucet(address recipient, uint256 amount) external {
    _mint(recipient, amount);
  }
}
