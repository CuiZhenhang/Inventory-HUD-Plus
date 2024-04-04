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
        setContainerSlot(container, 'helmet', Entity.getArmorSlot(player, EArmorType.HELMET))
        setContainerSlot(container, 'chestplate', Entity.getArmorSlot(player, EArmorType.CHESTPLATE))
        setContainerSlot(container, 'leggings', Entity.getArmorSlot(player, EArmorType.LEGGINGS))
        setContainerSlot(container, 'boots', Entity.getArmorSlot(player, EArmorType.BOOTS))
        Entity.getOffhandItem && setContainerSlot(container, 'offhand', Entity.getOffhandItem(player))
        container.sendChanges()
    }

    /**
     * @param { UI.Window } ui 
     */
    function closeGUI(ui) {
        if (ui.isOpened()) {
            let container = ui.getContainer()
            if (container) container.close()
            else ui.close()
        }
    }

    let autoOpen = false
    const Transparecy = Math.floor(255 * Settings.opacity)
    const FrameAlpha = Utils.cloneTextureWithAlpha('classic_frame_bg_light', Transparecy)
    const SlotAlpha = Utils.cloneTextureWithAlpha('classic_slot', Transparecy)
    const ShieldSlotAlpha = Utils.cloneTextureWithAlpha(Utils.mixTexture('ihp_shield', 'classic_slot', { x: 0.1, y: 0.1, width: 0.8, height: 0.8, times: 5 }), Transparecy)
    const DeleleSlotAlpha = Utils.cloneTextureWithAlpha(Utils.mixTexture('ihp_delete', 'classic_slot', { x: 0.1, y: 0.1, width: 0.8, height: 0.8, times: 5 }), Transparecy)
    const SortAlpha = Utils.cloneTextureWithAlpha('ihp_sort', Transparecy)
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
            'offhand': { type: 'slot', visual: true, x: 450, y: 42.5, size: 100, bitmap: ShieldSlotAlpha },
            'delete': { type: 'slot', x: 550, y: 42.5, size: 100, bitmap: DeleleSlotAlpha },
            'sort': {
                type: 'image',
                x: 660, y: 52.5,
                width: 80, height: 80,
                bitmap: SortAlpha,
                clicker: {
                    onClick: Utils.debounce(function () {
                        if (Settings.clientOnly) return
                        runOnClientThread(function () {
                            Network.sendToServer('IHP.sortInventory', {
                                sortId: Settings.sortId
                            })
                        })
                    }, 1000)
                }
            },
            'close': {
                type: 'image',
                x: 890, y: 22.5,
                width: 80, height: 80,
                bitmap: 'X',
                clicker: {
                    onClick: function () {
                        autoOpen = false
                        closeGUI(InventoryGUI)
                    }
                }
            }
        }
    })
    for (let index = 0; index < 36; ++index) {
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
        if (Utils.isHUDScreen(screenName)) {
            if (autoOpen && !InventoryGUI.isOpened()) {
                if (Settings.clientOnly) LocalContainer.openAs(InventoryGUI)
                else Network.sendToServer('IHP.InventoryGUI.open', {})
            }
        } else {
            closeGUI(InventoryGUI)
        }
    })

    if (Settings.clientOnly) {
        Callback.addCallback('LocalTick', function () {
            updateSlots(Player.get(), LocalContainer)
        })
    } else {
        /**
         * @param { ItemContainer } container 
         */
        let registerServerEventsForContainer = function (container) {
            container.addServerEventListener('InventorySlotToSlot', function (container, client, eventData) {
                // transfer from slot1 to slot2
                let player = client.getPlayerUid()
                let slot1 = Number(eventData.slot1), slot2 = Number(eventData.slot2)
                let nbtItem1 = Utils.getInventorySlot(slot1, player), nbtItem2 = Utils.getInventorySlot(slot2, player)
                if (Utils.isItemStackable(nbtItem1, nbtItem2)) {
                    if (!nbtItem2 || !nbtItem2.ic) return
                    let maxStack = Item.getMaxStack(nbtItem2.ic.id)
                    let deltaCount = Math.min(nbtItem1.ic.count, maxStack - nbtItem2.ic.count, eventData.count)
                    if (deltaCount === 0) return
                    nbtItem1.ic.count -= deltaCount, nbtItem2.ic.count += deltaCount
                    void (((nbtItem1.nbt.value || {})['Count'] || {}).value -= deltaCount)
                    void (((nbtItem2.nbt.value || {})['Count'] || {}).value += deltaCount)
                    Utils.setInventorySlot(slot1, player, nbtItem1)
                    Utils.setInventorySlot(slot2, player, nbtItem2)
                } else if (nbtItem2.ic.id === 0) {
                    let deltaCount = Math.min(nbtItem1.ic.count, eventData.count)
                    if (deltaCount === 0) return
                    nbtItem1.ic.count -= deltaCount
                    void (((nbtItem1.nbt.value || {})['Count'] || {}).value -= deltaCount)
                    Utils.setInventorySlot(slot1, player, nbtItem1)
                    // because nbtItem2 is empty
                    nbtItem1.ic.count = deltaCount
                    void (((nbtItem1.nbt.value || {})['Count'] || {}).value += deltaCount)
                    Utils.setInventorySlot(slot2, player, nbtItem1)
                } else {
                    Utils.setInventorySlot(slot1, player, nbtItem2)
                    Utils.setInventorySlot(slot2, player, nbtItem1)
                }
            })
            container.addServerEventListener('SlotToInventorySlot', function (container, connectedClient, eventData) {
                // copy from ../lib/VanillaSlots.js (version 4) line 175-194
                var player = new PlayerActor(connectedClient.getPlayerUid());
                var slot1 = container.getSlot(eventData.slot1).asScriptable();
                var transferPolicy1 = container.getGetTransferPolicy(eventData.slot1);
                var slot2 = player.getInventorySlot(eventData.slot2);
                if((slot2.id != slot1.id || slot2.data != slot1.data || (slot2.extra != slot1.extra && ((!slot2.extra || slot2.extra.getAllCustomData()) != (!slot1.extra || slot1.extra.getAllCustomData())))) && slot2.id != 0){
                    var transferPolicy2 = container.getAddTransferPolicy(eventData.slot1);
                    if(transferPolicy1 && transferPolicy1.transfer(container, eventData.slot1, slot1.id, slot1.count, slot1.data, slot1.extra, connectedClient.getPlayerUid()) != slot1.count) return;
                    if(transferPolicy2 && transferPolicy2.transfer(container, eventData.slot1, slot2.id, slot2.count, slot2.data, slot2.extra, connectedClient.getPlayerUid()) != slot2.count) return;
                    player.setInventorySlot(eventData.slot2, slot1.id, slot1.count, slot1.data, slot1.extra);
                    container.setSlot(eventData.slot1, slot2.id, slot2.count, slot2.data, slot2.extra);
                    container.sendChanges();
                    return;
                }
                var _count = slot2.id != 0 ? Math.min(eventData.count, Item.getMaxStack(slot2.id) - slot2.count) : eventData.count;
                if(_count <= 0) return;
                if(transferPolicy1)_count = (transferCount = transferPolicy1.transfer(container, eventData.slot1, slot1.id, _count, slot1.data, slot1.extra, connectedClient.getPlayerUid())) != undefined && transferCount != null ? transferCount : _count;
                player.setInventorySlot(eventData.slot2, slot1.id, slot2.id != 0 ? slot2.count + _count : _count, slot1.data, slot1.extra);
                container.setSlot(eventData.slot1, slot1.id, slot1.count - _count, slot1.data, slot1.extra);
                container.getSlot(eventData.slot1).validate();
                container.sendChanges();
            })
            container.addServerEventListener('InventorySlotToContainerSlot', function (container, client, eventData) {
                let slotIndex = eventData.slot1
                let slotId = eventData.slot2
                switch (slotId) {
                    case 'delete': {
                        let actor = new PlayerActor(client.getPlayerUid())
                        let item = actor.getInventorySlot(slotIndex)
                        if (!item.id || !item.count) return
                        let slot = container.getSlot('delete')
                        if (slot.id === item.id && slot.data === item.data && Utils.isExtraEqual(slot.extra, item.extra)) {
                            let count = Math.min(slot.count + item.count, Item.getMaxStack(slot.id))
                            container.setSlot('delete', slot.id, count, slot.data, slot.extra)
                        } else {
                            container.setSlot('delete', item.id, item.count, item.data, item.extra || null)
                        }
                        actor.setInventorySlot(slotIndex, 0, 0, 0, null)
                        container.sendChanges()
                        break
                    }
                }
            })
        }

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
            registerServerEventsForContainer(container)
        })
        Callback.addCallback('ServerPlayerTick', function (player) {
            updateSlots(player, ServerContainer[player])
        })
        Callback.addCallback('EntityDeath', function (entity) {
            if (Entity.getType(entity) !== EEntityType.PLAYER) return
            let container = ServerContainer[entity]
            if (!container) return
            container.setSlot('delete', 0, 0, 0)
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
        Network.addServerPacket('IHP.sortInventory', function (client, data) {
            let player = client.getPlayerUid()
            let inventory = Utils.reduceInventory(Utils.getInventory(player).slice(9))
            let compareFn = Utils.getSortingFn(data.sortId || Utils.defaultSortId)
            inventory.sort(compareFn)
            for (let index = 9; index < 36; ++index) {
                Utils.setInventorySlot(index, player, inventory[index - 9] || null)
            }
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
            closeGUI(InventoryGUI)
        }
    }
})()
