# u25challenge

[page](https://mizukisonoko.github.io/u25challenge/)

スマートU25　応援サイトです。

# How to use

1) [page](https://mizukisonoko.github.io/u25challenge/) にアクセスし出発空港を選択します。
2) 「Go TRAVEL」を押すと現在時刻から１時間後以降に出発する飛行機が順番に表示されます。
3) 上から順に [ana公式ページ](https://www.ana.co.jp/en/jp/) 、または空港にあるANAの発券機などで購入可能か調べ、空席があれば買います。
4) 乗ります。  

㌽: 空港で利用すると楽です。

# Example

1) 羽田空港へ行きます。
2) [page](https://mizukisonoko.github.io/u25challenge/) にアクセスしHND空港を選択します。
3) 以下のような結果が出ます(例)。
![image](https://user-images.githubusercontent.com/6281583/84413706-f881c400-ac4b-11ea-89af-47fbec895dc9.png)

4) 「鹿児島空港」,「福岡空港」,「高知空港」の順番に空席があるか確認します。
5) 空席があった時点で購入、出た空港に飛行機で向かいます。

# What's 'スマートU25' 

> 12歳以上25歳以下のANAマイレージクラブ会員のお客様がご購入いただけるおトクな運賃です。  
> 当日空席があれば予約が可能！  

[参考](https://www.ana.co.jp/ja/jp/book-plan/fare/domestic/smart-u25/)

# Data sources

[東京公共交通オープンデータチャレンジ](https://tokyochallenge.odpt.org/)
[Open Data Challenge for Public Transportation in Tokyo](https://tokyochallenge.odpt.org/en/index.html)

```
フライト時刻表、リアルタイム発着情報 by 全日本空輸
flight timetable, departure information by All Nippon Airways
```

# How to retrive data 

```sh
$ curl 'https://api-tokyochallenge.odpt.org/api/v4/odpt:FlightInformationDeparture?odpt:operator=odpt.Operator:ANA&acl:consumerKey=<Your Key>' > assets/data.json
```