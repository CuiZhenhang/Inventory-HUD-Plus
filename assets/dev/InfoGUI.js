/// <reference path='./SettingsGUI.js'/>

const InfoGUI = (function () {
    /**
     * @param { NBTItem } nbtItem 
     * @returns { number }
     */
    function getDamage(nbtItem) {
        let damage = nbtItem.ic.data
        if (IsNewVersion && Item.isNativeItem(nbtItem.ic.id)) {
            let tag = nbtItem.nbt.value['tag']
            let damageNBT = tag && tag.value['Damage']
            let value = damageNBT && damageNBT.value
            if (typeof value === 'number') {
                damage = Math.max(damage, value)
            }
        }
        return damage
    }

    /**
     * @param { SlotWithTextElement } element 
     * @param { Nullable<NBTItem> } nbtItem 
     */
    function setDamage(element, nbtItem) {
        if (!nbtItem || !nbtItem.ic || nbtItem.ic.id === 0) {
            element.setItem(null)
            return
        }
        let maxDamage = Item.getMaxDamage(nbtItem.ic.id)
        if (!maxDamage) return
        let damage = getDamage(nbtItem)
        nbtItem.ic.data = damage
        let percent = (maxDamage - damage) / Math.max(maxDamage, 10)
        let text = maxDamage - damage
        if (maxDamage >= 20 && percent >= 0.5) text = -damage
        if (String(text).length > 5) {
            let e = 0
            while (text <= -10 || text >= 10) text /= 10, ++e;
            text = String(text).substring(0, 3 + (text < 0 ? 1 : 0)) + 'e' + e
        }
        let color = Color.WHITE
        if (percent >= 0.7) color = Color.rgb(0, 200, 0)
        else if (percent >= 0.4) color = Color.rgb(0, 200, 200)
        else if (percent >= 0.2) color = Color.rgb(200, 200, 0)
        else if (percent >= 0.1) color = Color.rgb(200, 100, 0)
        else color = Color.rgb(200, 0, 0)
        element.setItem(nbtItem.ic)
        element.setText(String(text), color)
    }

    /**
     * @param { SlotWithTextElement } element 
     * @param { Nullable<NBTItem> } nbtItem 
     * @param { { [idData: `${string}:${number}`]: number } } sortInventory 
     */
    function setCount(element, nbtItem, sortInventory) {
        if (!nbtItem || !nbtItem.ic || nbtItem.ic.id === 0) element.setItem(null)
        else if (Item.getMaxDamage(nbtItem.ic.id)) setDamage(element, nbtItem)
        else {
            let item = nbtItem.ic
            if (!item.extra || item.extra.isEmpty()) {
                item.count = Math.max(item.count, sortInventory[item.id + ':' + item.data])
            }
            element.setItem(item)
        }
    }

    const InfoGUI = new UI.Window({
        location: {
            x: Settings.information.x,
            y: Settings.information.y,
            width: Settings.information.width,
            height: Settings.information.width * 2
        },
        drawing: [
            { type: 'background', color: Color.TRANSPARENT }
        ],
        elements: {
            'more_btn': {
                type: 'image', bitmap: 'clear',
                x: 0, y: 1000, z: 1, width: 500, height: 500,
                clicker: {
                    onClick: Utils.debounce(function () {
                        if (InventoryGUI.isOpened()) InventoryGUI.close()
                        else InventoryGUI.open()
                    }, 200)
                }
            },
            'more_text': {
                type: 'text',
                x: 250, y: 1000, z: 2,
                font: { color: Color.WHITE, size: 300, align: 1 },
                text: 'H'
            },
            'settings': {
                type: 'image', bitmap: 'ihp_setting',
                x: 50, y: 1550, width: 400, height: 400,
                clicker: {
                    onClick: Utils.debounce(function () {
                        SettingsGUI.openSettings()
                    }, 500)
                }
            }
        }
    })
    InfoGUI.setAsGameOverlay(true)
    const elements = {
        'carried': Utils.createSlotWithTextElement(InfoGUI.content.elements, 'carried', [0, 0, 500]),
        'offhand': Utils.createSlotWithTextElement(InfoGUI.content.elements, 'offhand', [0, 500, 500]),
        'helmet': Utils.createSlotWithTextElement(InfoGUI.content.elements, 'helmet', [500, 0, 500]),
        'chestplate': Utils.createSlotWithTextElement(InfoGUI.content.elements, 'chestplate', [500, 500, 500]),
        'leggings': Utils.createSlotWithTextElement(InfoGUI.content.elements, 'leggings', [500, 1000, 500]),
        'boots': Utils.createSlotWithTextElement(InfoGUI.content.elements, 'boots', [500, 1500, 500])
    }

    Callback.addCallback('NativeGuiChanged', function (screenName) {
        let isHUDScreen = Utils.isHUDScreen(screenName)
        if (isHUDScreen === InfoGUI.isOpened()) return
        if (isHUDScreen) InfoGUI.open()
        else if (!Settings.information.alwaysOpen) InfoGUI.close()
    })

    Callback.addCallback('LevelLeft', function () {
        if (InfoGUI.isOpened()) InfoGUI.close()
        for (let name in elements) elements[name].setItem(null)
        InfoGUI.forceRefresh()
    })

    Callback.addCallback('LevelSelected', function () {
        for (let name in elements) elements[name].setItem(null)
        InfoGUI.forceRefresh()
    })

    let tick = 0
    Callback.addCallback('LocalTick', function () {
        if (++tick % 4 /* 0.2s */) return
        tick = 0
        let compoundTag = Entity.getCompoundTag(Player.get())
        let snbt = new ScriptableNBT.NBTCompoundValue(compoundTag)
        let inventory = [
            Utils.getArmorSlot(EArmorType.HELMET, null, snbt),
            Utils.getArmorSlot(EArmorType.CHESTPLATE, null, snbt),
            Utils.getArmorSlot(EArmorType.LEGGINGS, null, snbt),
            Utils.getArmorSlot(EArmorType.BOOTS, null, snbt),
            Utils.getOffhandItem(null, snbt)
        ].concat(Utils.getInventory(null, snbt))
        let sortInventory = Utils.getSortInventory(inventory)
        setDamage(elements['helmet'], inventory[0])
        setDamage(elements['chestplate'], inventory[1])
        setDamage(elements['leggings'], inventory[2])
        setDamage(elements['boots'], inventory[3])
        setCount(elements['carried'], Utils.getCarriedItem(), sortInventory)
        setCount(elements['offhand'], inventory[4], sortInventory)
        InfoGUI.forceRefresh()
    })

    return InfoGUI
})()
