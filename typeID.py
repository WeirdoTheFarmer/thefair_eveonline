import json
import urllib.parse



class TypeID:

    def getID(self, typeName):
        with open("typeid.json") as file:
            typeID_DB = json.load(file)
#       typeName = typeName.replace("%20", " ")
        typeIdName = urllib.parse.unquote(typeName) 
        typeID = typeID_DB[typeName]["0"]
        return(typeID)
