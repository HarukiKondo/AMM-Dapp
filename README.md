# AMM-Dapp

Avalanche Testnet 上で動作する AMM(オートマーケットメイカー)の Dapp 用リポジトリ

### SWAP の仕組み

$k = y * x$を使用。 k を固定値とすれば y と x の積の値は一定となる。k の値になるように y と x が変動する。

## 動かし方

- クローン

  ```bash
  git clone https://github.com/HarukiKondo/AMM-Dapp.git
  ```

- 環境変数のセットアップ

  以下のコマンドを実行

  ```bash
  cp packages/backend/.env.example packages/backend/.env
  ```

  `.env` に以下の値をセットする。

  ```txt
  PRIVATE_KEY=<ここにMetamaskからコピーしてきた秘密鍵の値を貼り付ける。>
  ```

- インストール

  ```bash
  yarn
  ```

- フォーマッター適用

  ```bash
  yarn format
  ```

- スマートコントラクト

  - コンパイル

    ```bash
    yarn backend compile
    ```

  - テスト

    ```bash
    yarn backend test
    ```

  - Avalanche テストネットへデプロイ

    ```bash
    yarn backend deploy:fuji
    ```

    以下の用に 3 つのスマートコントラクトがデプロイされていれば OK!

    ```bash
    usdc address: 0xADDd44f439C39bC4DfA66424059E2dC1e03488Ef
    joe address: 0x5Cb749A5fD9CcE85189Ef3070A7dad48FDc57aE3
    amm address: 0x0cbEB56bFe3d694eB1040995a63db5536E60b4ea
    ```

    この 3 つの値を `packages/frontend/hooks/useContract.ts` の 12 行目付近の変数にそれぞれ置き換える。

    ```ts
    // 自分でコントラクトをデプロイした場合は、この3つの値を書き換える。
    export const UsdcAddress = "ここにデプロイしたアドレスをいれる";
    export const JoeAddress = "ここにデプロイしたアドレスをいれる";
    export const AmmAddress = "ここにデプロイしたアドレスをいれる";
    ```

  - フロントエンド側で使うソースコードを移動させる。

    ```bash
    yarn backend copy
    ```

- フロントエンド

  - ビルド

    ```bash
    yarn frontend build
    ```

  - 起動

    ```bash
    yarn frontend dev
    ```
