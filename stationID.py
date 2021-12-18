import json


class StationID:

    def getID(self, stationID):
        with open("stationID.json") as file:
            station_ID_DB = json.load(file)
        station_name = station_ID_DB[stationID]["stationName"]
        return (station_name)