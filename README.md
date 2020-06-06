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

# Howt to retrive data 

```sh
$ curl https://api-tokyochallenge.odpt.org/api/v4/odpt:FlightSchedule?odpt:operator=odpt.Operator:ANA&acl:consumerKey=<my key> > assets/data.json
```