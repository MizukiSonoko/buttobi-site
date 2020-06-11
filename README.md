# u25challenge

[page](https://mizukisonoko.github.io/u25challenge/)

> smart-u25 challenge page

# What's 'スマートU25' 

> 12歳以上25歳以下のANAマイレージクラブ会員のお客様がご購入いただけるおトクな運賃です。
> 当日空席があれば予約が可能！
[URL](https://www.ana.co.jp/ja/jp/book-plan/fare/domestic/smart-u25/)

# Data sources

[東京公共交通オープンデータチャレンジ](https://tokyochallenge.odpt.org/)
[Open Data Challenge for Public Transportation in Tokyo](https://tokyochallenge.odpt.org/en/index.html)
I uses this data
```
フライト時刻表、リアルタイム発着情報 by 全日本空輸
flight timetable, departure information by All Nippon Airways
```

# How to retrive data 

```sh
$ curl 'https://api-tokyochallenge.odpt.org/api/v4/odpt:FlightInformationDeparture?odpt:operator=odpt.Operator:ANA&acl:consumerKey=1yOXjfC299f68M_Yq2gshqwYLemqaWB1Sq7RF1seRsA' > assets/data.json
```