import ujson

with open("stationID.json") as file:
    station_ID_DB = ujson.decode(file)
    station_name = station_ID_DB["60013459"]["stationNeame"]

    print(station_name)
