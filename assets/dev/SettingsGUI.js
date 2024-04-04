/// <reference path='./translation.js'/>

const SettingsGUI = (function () {
    const ScreenHeight = UI.getScreenHeight()
    let tempSettings = {
        'sortId': Settings.sortId,
        'information.alwaysOpen': Settings.information.alwaysOpen,
        'information.x': Settings.information.x,
        'information.y': Settings.information.y,
        'information.width': Settings.information.width,
        'inventory.x': Settings.inventory.x,
        'inventory.y': Settings.inventory.y,
        'inventory.width': Settings.inventory.width
    }

    /**
     * @param { keyof typeof tempSettings } key 
     * @returns { boolean } true if [[Settings]] is changed
     */
    function updateSettingsOfKey(key) {
        let value = tempSettings[key]
        let keys = key.split('.')
        if (keys.length === 1) {
            let key0 = keys[0]
            if (Settings[key0] === value) return false
            Settings[key0] = value
            __config__.set(key, value)
        } else if (keys.length === 2) {
            let key0 = keys[0], key1 = keys[1]
            if (Settings[key0][key1] === value) return false
            Settings[key0][key1] = value
            __config__.set(key, value)
        }
        return true
    }

    function updateSettings() {
        updateSettingsOfKey('sortId')
        updateSettingsOfKey('information.alwaysOpen')
        {
            tempSettings['information.width'] = Math.round(tempSettings['information.width'])
            tempSettings['information.x'] = Math.round(tempSettings['information.x'])
            tempSettings['information.y'] = Math.round(tempSettings['information.y'])
            if (tempSettings['information.width'] * 2 > ScreenHeight) {
                tempSettings['information.width'] = Math.floor(ScreenHeight / 2)
            }
            if (tempSettings['information.x'] + tempSettings['information.width'] > 1000) {
                tempSettings['information.x'] = 1000 - tempSettings['information.width']
            }
            if (tempSettings['information.y'] + tempSettings['information.width'] * 2 > ScreenHeight) {
                tempSettings['information.y'] = Math.ceil(ScreenHeight - tempSettings['information.width'] * 2)
            }
            let changed = false
            if (updateSettingsOfKey('information.x')) {
                InfoGUI.getLocation().x = tempSettings['information.x']
                changed = true
            }
            if (updateSettingsOfKey('information.y')) {
                InfoGUI.getLocation().y = tempSettings['information.y']
                changed = true
            }
            if (updateSettingsOfKey('information.width')) {
                let location = InfoGUI.getLocation()
                location.scrollX = location.width = tempSettings['information.width']
                location.scrollY = location.height = tempSettings['information.width'] * 2
                changed = true
            }
            if (changed) {
                if (InfoGUI.isOpened()) InfoGUI.updateWindowLocation()
                InfoGUI.getContentProvider().refreshDrawing()
                InfoGUI.getContentProvider().refreshElements()
                InfoGUI.getElementProvider().invalidateAll()
                InfoGUI.forceRefresh()
            }
        }
        {
            tempSettings['inventory.width'] = Math.round(tempSettings['inventory.width'])
            tempSettings['inventory.x'] = Math.round(tempSettings['inventory.x'])
            tempSettings['inventory.y'] = Math.round(tempSettings['inventory.y'])
            if (tempSettings['inventory.width'] * (200 / 320) > ScreenHeight) {
                tempSettings['inventory.width'] = Math.floor(ScreenHeight / (200 / 320))
            }
            if (tempSettings['inventory.x'] + tempSettings['inventory.width'] > 1000) {
                tempSettings['inventory.x'] = 1000 - tempSettings['inventory.width']
            }
            if (tempSettings['inventory.y'] + tempSettings['inventory.width'] * (200 / 320) > ScreenHeight) {
                tempSettings['inventory.y'] = Math.ceil(ScreenHeight - tempSettings['inventory.width'] * (200 / 320))
            }
            let changed = false
            if (updateSettingsOfKey('inventory.x')) {
                InventoryGUI.ui.getLocation().x = tempSettings['inventory.x']
                changed = true
            }
            if (updateSettingsOfKey('inventory.y')) {
                InventoryGUI.ui.getLocation().y = tempSettings['inventory.y']
                changed = true
            }
            if (updateSettingsOfKey('inventory.width')) {
                let location = InventoryGUI.ui.getLocation()
                location.scrollX = location.width = tempSettings['inventory.width']
                location.scrollY = location.height = tempSettings['inventory.width'] * (200 / 320)
                changed = true
            }
            if (changed) {
                if (InventoryGUI.ui.isOpened()) InventoryGUI.ui.updateWindowLocation()
                InventoryGUI.ui.getContentProvider().refreshDrawing()
                InventoryGUI.ui.getContentProvider().refreshElements()
                InventoryGUI.ui.getElementProvider().invalidateAll()
                InventoryGUI.ui.forceRefresh()
            }
        }
        __config__.save()
    }

    Callback.addCallback('PostLoaded', function () {
        updateSettings()
    })

    function getArguments() {
        return [
            'ihp:Settings', 'Apply',
            ['keyValue', 'multipleChoice', 'ihp:sort order', 'sortId', Utils.getSortIdList()],
            ['sectionDivider', 'ihp:Information GUI'],
            ['checkBox', 'information.alwaysOpen', 'ihp:always open'],
            ['keyValue', 'slider', 'ihp:x position', 'information.x', 0, 1000, 1, ''],
            ['keyValue', 'slider', 'ihp:y position', 'information.y', 0, Math.ceil(ScreenHeight), 1, ''],
            ['keyValue', 'slider', 'ihp:width', 'information.width', 10, 200, 1, ''],
            ['sectionDivider', 'ihp:Inventory GUI'],
            ['keyValue', 'slider', 'ihp:x position', 'inventory.x', 0, 1000, 1, ''],
            ['keyValue', 'slider', 'ihp:y position', 'inventory.y', 0, Math.ceil(ScreenHeight), 1, ''],
            ['keyValue', 'slider', 'ihp:width', 'inventory.width', 100, 800, 1, '']
        ]
    }

    return {
        openSettings: function () {
            if (getContext()) showConfig(getArguments(), tempSettings, updateSettings)
        }
    }
})()
