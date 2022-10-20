/// <reference path='./InventoryGUI.js'/>

ModAPI.registerAPI('Inventory-HUD-Plus-API', {
    version: __mod__.getVersion(),
    requireGlobal: function (cmd) { return eval(cmd) }
})
Logger.Log('The API of Inventory HUD Plus is named Inventory-HUD-Plus-API.', 'API')
