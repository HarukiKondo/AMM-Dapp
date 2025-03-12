# AMM-Dapp

Avalanche Testnet 上で動作する AMM(オートマーケットメイカー)の Dapp 用リポジトリ

### SWAP の仕組み

$k = y * x$を使用。 k を固定値とすれば y と x の積の値は一定となる。k の値になるように y と x が変動する。

## 動かし方

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
