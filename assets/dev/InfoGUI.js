/// <reference path='./SettingsGUI.js'/>

const InfoGUI = (function () {
    const ColorOrange = Color.rgb(255, 127, 0)
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
        let damage = Utils.getDamage(nbtItem)
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
        if (percent >= 0.7) color = Color.GREEN
        else if (percent >= 0.4) color = Color.CYAN
        else if (percent >= 0.2) color = Color.YELLOW
        else if (percent >= 0.1) color = ColorOrange
        else color = Color.RED
        element.setItem(nbtItem.ic)
        element.setText(String(text), color)
    }

    /**
     * @param { SlotWithTextElement } element 
     * @param { Nullable<NBTItem> } nbtItem 
     * @param { number } count 
     */
    function setCount(element, nbtItem, count) {
        if (!nbtItem || !nbtItem.ic || nbtItem.ic.id === 0) element.setItem(null)
        else if (Item.getMaxDamage(nbtItem.ic.id)) setDamage(element, nbtItem)
        else {
            let item = nbtItem.ic
            let itemCount = item.count
            if (!item.extra || item.extra.isEmpty()) {
                itemCount = Math.max(itemCount, count)
            }
            element.setItem({
                id: item.id,
                count: itemCount,
                data: item.data,
                extra: item.extra
            })
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
        if (++tick % 4 /* 0.1s */) return
        tick = 0
        let armor = [
            Utils.getArmorSlot(EArmorType.HELMET),
            Utils.getArmorSlot(EArmorType.CHESTPLATE),
            Utils.getArmorSlot(EArmorType.LEGGINGS),
            Utils.getArmorSlot(EArmorType.BOOTS),
        ]
        setDamage(elements['helmet'], armor[0])
        setDamage(elements['chestplate'], armor[1])
        setDamage(elements['leggings'], armor[2])
        setDamage(elements['boots'], armor[3])
        let carried = Utils.getCarriedItem()
        let offhand = Utils.getOffhandItem()
        let carriedItem = (carried && carried.ic) || { id: 0, count: 0, data: 0 }
        let offhandItem = (offhand && offhand.ic) || { id: 0, count: 0, data: 0 }
        let carriedCount = 0, offhandCount = offhandItem.id ? offhandItem.count : 0
        if (offhandItem.id && offhandItem.id === carriedItem.id && offhandItem.data === carriedItem.data) {
            carriedCount += offhandItem.count
        }
        armor.forEach(function (nbtItem) {
            if (!nbtItem || !nbtItem.ic || nbtItem.ic.id === 0) return
            if (nbtItem.ic.id === carriedItem.id && nbtItem.ic.data === carriedItem.data) {
                carriedCount += nbtItem.ic.count
            }
            if (nbtItem.ic.id === offhandItem.id && nbtItem.ic.data === offhandItem.data) {
                offhandCount += nbtItem.ic.count
            }
        })
        for (let slot = 0; slot < 36; ++slot) {
            let item = Player.getInventorySlot(slot)
            if (item.id === 0) continue
            if (item.id === carriedItem.id && item.data === carriedItem.data) {
                carriedCount += item.count
            }
            if (item.id === offhandItem.id && item.data === offhandItem.data) {
                offhandCount += item.count
            }
        }
        setCount(elements['carried'], carried, carriedCount)
        setCount(elements['offhand'], offhand, offhandCount)
        InfoGUI.forceRefresh()
    })

    return InfoGUI
})()
