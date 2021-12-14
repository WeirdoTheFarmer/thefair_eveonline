import json


class TypeID:

    def getID(self, typeName):
        with open("typeid.json") as file:
            typeID_DB = json.load(file)
        typeID = typeID_DB[typeName]["0"]
        return(typeID)
