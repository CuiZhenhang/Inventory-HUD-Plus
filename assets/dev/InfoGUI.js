/// <reference path='./translation.js'/>

const InfoGUI = (function () {
    /**
     * @param { ItemInstance } item 
     * @returns { number }
     */
    function getDamage(item) {
        let damage = item.data
        if (IsNewVersion && Item.isNativeItem(item.id)) {
            if (item.extra) {
                /** @todo */
                let compoundTag = item.extra.getCompoundTag()
                // compoundTag.getInt('Damage')
                // compoundTag && Debug(JSON.stringify(compoundTag.toScriptable()), {
                //     log: true,
                //     message: true
                // })
            }
        }
        return damage
    }

    /**
     * @param { SlotWithTextElement } element 
     * @param { ItemInstance } item 
     */
    function setDamage(element, item) {
        element.setItem(item)
        if (!item || item.id === 0) return
        let maxDamage = Item.getMaxDamage(item.id)
        if (!maxDamage) return
        let damage = getDamage(item)
        let percent = (maxDamage - damage) / Math.max(maxDamage, 10)
        let text = maxDamage - damage
        if (maxDamage >= 20 && percent >= 0.5) text = -damage
        if (String(text).length > 5) {
            let e = 0
            while (text <= -10 || text >= 10) text /= 10, ++e;
            text = String(text).substring(0, 3 + (text < 0)) + 'e' + e
        }
        let color = Color.WHITE
        if (percent >= 0.7) color = Color.rgb(0, 200, 0)
        else if (percent >= 0.4) color = Color.rgb(0, 200, 200)
        else if (percent >= 0.2) color = Color.rgb(200, 200, 0)
        else if (percent >= 0.1) color = Color.rgb(200, 100, 0)
        else color = Color.rgb(200, 0, 0)
        element.setText(text, color)
    }

    /**
     * @param { SlotWithTextElement } element 
     * @param { ItemInstance } item 
     * @param { { [idData: `${number}:${number}`]: number; } } sortInventory 
     */
    function setCount(element, item, sortInventory) {
        if (!item || item.id === 0) element.setItem(null)
        else if (Item.getMaxDamage(item.id)) setDamage(element, item)
        else {
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
                    onClick: function () {
                        if (InventoryGUI.isOpened()) InventoryGUI.close()
                        else InventoryGUI.open()
                    }
                }
            },
            'more_text': {
                type: 'text',
                x: 250, y: 1100, z: 2,
                font: { color: Color.WHITE, size: 300, align: 1 },
                text: 'H'
            }
        }
    })
    InfoGUI.setAsGameOverlay(true)
    const elements = {
        'carried': CreateSlotWithTextElement(InfoGUI.content.elements, 'carried', [0, 0, 500]),
        'offhand': CreateSlotWithTextElement(InfoGUI.content.elements, 'offhand', [0, 500, 500]),
        'helmet': CreateSlotWithTextElement(InfoGUI.content.elements, 'helmet', [500, 0, 500]),
        'chestplate': CreateSlotWithTextElement(InfoGUI.content.elements, 'chestplate', [500, 500, 500]),
        'leggings': CreateSlotWithTextElement(InfoGUI.content.elements, 'leggings', [500, 1000, 500]),
        'boots': CreateSlotWithTextElement(InfoGUI.content.elements, 'boots', [500, 1500, 500])
    }

    Callback.addCallback('NativeGuiChanged', function (screenName) {
        let isHUDScreen = IsHUDScreen(screenName)
        if (isHUDScreen === InfoGUI.isOpened()) return
        if (isHUDScreen) InfoGUI.open()
        else InfoGUI.close()
    })

    Callback.addCallback('LevelSelected', function () {
        for (let name in elements) elements[name].setItem(null)
        InfoGUI.forceRefresh()
    })

    let tick = 0
    Callback.addCallback('LocalTick', function () {
        if (++tick % 4 /* 0.2s */) return
        tick = 0
        let inventory = [
            Player.getArmorSlot(Native.ArmorType.helmet),
            Player.getArmorSlot(Native.ArmorType.chestplate),
            Player.getArmorSlot(Native.ArmorType.leggings),
            Player.getArmorSlot(Native.ArmorType.boots),
            GetOffhandItem(Player.get())
        ]
        for (let i = 0; i < 36; i++) inventory.push(Player.getInventorySlot(i))
        let sortInventory = GetSortInventory(inventory)
        setDamage(elements['helmet'], inventory[0])
        setDamage(elements['chestplate'], inventory[1])
        setDamage(elements['leggings'], inventory[2])
        setDamage(elements['boots'], inventory[3])
        setCount(elements['carried'], Player.getCarriedItem(), sortInventory)
        setCount(elements['offhand'], inventory[4], sortInventory)
        InfoGUI.forceRefresh()
    })

    return InfoGUI
})()
