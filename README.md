# u25challenge

[page](https://mizukisonoko.github.io/u25challenge/)

> smart-u25 challenge page

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Data sources

[東京公共交通オープンデータチャレンジ](https://tokyochallenge.odpt.org/)
I uses this data
```
フライト時刻表、リアルタイム発着情報 by 全日本空輸
```

# How to retrive data 

```sh
$ curl 'https://api-tokyochallenge.odpt.org/api/v4/odpt:FlightInformationDeparture?odpt:operator=odpt.Operator:ANA&acl:consumerKey=1yOXjfC299f68M_Yq2gshqwYLemqaWB1Sq7RF1seRsA' > assets/data.json
```