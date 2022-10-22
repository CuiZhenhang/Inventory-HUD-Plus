/// <reference path='./InfoGUI.js'/>

const InventoryGUI = (function () {
    /**
     * @param { ItemContainer | UI.Container } container 
     * @param { string } name 
     * @param { ItemInstance } item 
     */
    function setContainerSlot(container, name, item) {
        container.setSlot(name, item.id, item.count, item.data, item.extra || null)
    }

    /**
     * @param { number } player 
     * @param { Nullable<ItemContainer | UI.Container> } container 
     */
    function updateSlots(player, container) {
        if (!container) return
        setContainerSlot(container, 'helmet', Entity.getArmorSlot(player, Native.ArmorType.helmet))
        setContainerSlot(container, 'chestplate', Entity.getArmorSlot(player, Native.ArmorType.chestplate))
        setContainerSlot(container, 'leggings', Entity.getArmorSlot(player, Native.ArmorType.leggings))
        setContainerSlot(container, 'boots', Entity.getArmorSlot(player, Native.ArmorType.boots))
        setContainerSlot(container, 'offhand', GetOffhandItem(player))
        container.sendChanges()
    }

    let autoOpen = false
    const Transparecy = Math.floor(256 * Settings.opacity - 1e-6)
    const FrameAlpha = CloneTextureWithAlpha('classic_frame_bg_light', Transparecy)
    const SlotAlpha = CloneTextureWithAlpha('classic_slot', Transparecy)
    const LocalContainer = new UI.Container()
    const InventoryGUI = new UI.Window({
        location: {
            x: Settings.inventory.x,
            y: Settings.inventory.y,
            width: Settings.inventory.width,
            height: Settings.inventory.width * (200 / 320)
        },
        drawing: [
            { type: 'background', color: Color.TRANSPARENT },
            { type: 'frame', x: 0, y: 0, width: 1000, height: 625, bitmap: FrameAlpha, scale: 4 }
        ],
        elements: {
            'helmet': { type: 'slot', visual: true, x: 50, y: 42.5, size: 100, bitmap: SlotAlpha },
            'chestplate': { type: 'slot', visual: true, x: 150, y: 42.5, size: 100, bitmap: SlotAlpha },
            'leggings': { type: 'slot', visual: true, x: 250, y: 42.5, size: 100, bitmap: SlotAlpha },
            'boots': { type: 'slot', visual: true, x: 350, y: 42.5, size: 100, bitmap: SlotAlpha },
            'offhand': { type: 'slot', visual: true, x: 450, y: 42.5, size: 100, bitmap: SlotAlpha }
        }
    })
    for (let index = 0; index < 36; index++) {
        let x = 50 + 100 * (index % 9)
        let y = index < 9 ? 482.5 : 162.5 + 100 * Math.floor((index - 9) / 9)
        InventoryGUI.content.elements['slot_' + index] = {
            type: 'invSlot',
            x: x, y: y, size: 100,
            bitmap: SlotAlpha,
            index: index
        }
    }
    InventoryGUI.setAsGameOverlay(true)
    InventoryGUI.setInventoryNeeded(true)
    if (Settings.clientOnly) InventoryGUI.setTouchable(false)

    Callback.addCallback('NativeGuiChanged', function (screenName) {
        if (IsHUDScreen(screenName)) {
            if (autoOpen) {
                if (Settings.clientOnly) LocalContainer.openAs(InventoryGUI)
                else Network.sendToServer('IHP.InventoryGUI.open', {})
            }
        } else {
            if (InventoryGUI.isOpened()) {
                let container = InventoryGUI.getContainer()
                if (container) container.close()
                else InventoryGUI.close()
            }
        }
    })

    if (Settings.clientOnly) {
        Callback.addCallback('LocalTick', function () {
            updateSlots(Player.get(), LocalContainer)
        })
    } else {
        /** @type { {[player: number]: ItemContainer} } */
        const ServerContainer = {}

        ItemContainer.registerScreenFactory('IHP.InventoryGUI', function (container, screen) {
            let group = new UI.WindowGroup()
            group.addWindowInstance('main', InventoryGUI)
            return group
        })

        Callback.addCallback('ServerPlayerLoaded', function (player) {
            let container = ServerContainer[player] = new ItemContainer()
            container.setClientContainerTypeName('IHP.InventoryGUI')
            VanillaSlots.registerServerEventsForContainer(container)
        })
        Callback.addCallback('ServerPlayerTick', function (player) {
            updateSlots(player, ServerContainer[player])
        })
        Callback.addCallback('ServerPlayerLeft', function (player) {
            delete ServerContainer[player]
        })

        Network.addServerPacket('IHP.InventoryGUI.open', function (client, data) {
            let player = client.getPlayerUid()
            let container = ServerContainer[player]
            if (!container) return
            container.openFor(client, 'main')
        })
        Network.addServerPacket('IHP.InventoryGUI.close', function (client, data) {
            let player = client.getPlayerUid()
            let container = ServerContainer[player]
            if (!container) return
            container.closeFor(client)
        })

        VanillaSlots.registerForWindow(InventoryGUI)
    }

    return {
        ui: InventoryGUI,
        isOpened () { return InventoryGUI.isOpened() },
        open () {
            autoOpen = true
            if (Settings.clientOnly) LocalContainer.openAs(InventoryGUI)
            else Network.sendToServer('IHP.InventoryGUI.open', {})
        },
        close () {
            autoOpen = false
            if (Settings.clientOnly) LocalContainer.close()
            else Network.sendToServer('IHP.InventoryGUI.close', {})
        }
    }
})()
