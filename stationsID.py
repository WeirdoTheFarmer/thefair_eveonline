import json


class StationsID:

    def getID(self, locationID):
        with open("stationID.json") as file:
            stationID_DB = json.load(file)
        location_id = str(locationID)
        locationName = stationID_DB[location_id]["stationName"]
        return(locationName)
