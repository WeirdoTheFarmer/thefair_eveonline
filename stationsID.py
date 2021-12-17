import json


class StationsID:

    def getID(self, locationID):
        with open("stationID.json") as file:
            stationID_DB = json.load(file)
        locationName = stationID_DB[locationID]["stationName"]

        return(locationName)

x = StationsID()
print(x.getID("60014862"))