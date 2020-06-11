
# How to retrive data 

```sh
$ curl 'https://api-tokyochallenge.odpt.org/api/v4/odpt:FlightInformationDeparture?odpt:operator=odpt.Operator:ANA&acl:consumerKey=<Your Key>' > assets/current.json
```

```sh
$ curl 'https://api-tokyochallenge.odpt.org/api/v4/odpt:FlightSchedule?odpt:operator=odpt.Operator:ANA&acl:consumerKey=<Your Key>' > assets/data.json
```