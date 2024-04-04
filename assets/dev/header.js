/// <reference path='../declarations/core-engine.d.ts'/>
/// <reference path='../declarations/Retention.d.ts'/>
/// <reference path='../declarations/ScriptableNBT.d.ts'/>
/// <reference path='../declarations/VanillaSlots.d.ts'/>
/// <reference path='./share.js'/>

const IsNewVersion = getMCPEVersion().array[1] >= 16
const Settings = {
    /** @readonly */
    clientOnly: __config__.getBool('clientOnly'),
    /** @readonly */
    stableMode: __config__.getBool('stableMode'),
    /** @readonly */
    opacity: Math.min(Math.max(__config__.getFloat('opacity'), 0.1), 1),
    sortId: String(__config__.getString('sortId')),
    information: {
        alwaysOpen: __config__.getBool('information.alwaysOpen'),
        x: __config__.getInteger('information.x'),
        y: __config__.getInteger('information.y'),
        width: __config__.getInteger('information.width')
    },
    inventory: {
        x: __config__.getInteger('inventory.x'),
        y: __config__.getInteger('inventory.y'),
        width: __config__.getInteger('inventory.width')
    }
}

IMPORT('Retention:5')
IMPORT('ScriptableNBT:2')

if (getContext()) IMPORT('RuntimeConfig:3')
if (!Settings.clientOnly) IMPORT('VanillaSlots:4')

/** @type { android.graphics.Color | {} } */
const Color = getContext() ? android.graphics.Color : {}

const Utils = {
    /**
     * @param { string } message 
     * @param { Object } option 
     * @param { boolean = } option.log 
     * @param { boolean = } option.alert 
     * @param { boolean = } option.message 
     */
    debug (message, option) {
        if (option.log) Logger.Log(message, 'DEBUG')
        if (option.alert) alert(message)
        if (option.message) Game.message(message)
    },
    /** @type { <T extends any[], RT = any, TT = any>(func: (this: TT, ...args: T) => RT, delay: number, func2?: Nullable<(this: TT, ...args: T) => RT>, ths?: TT) => (...args: T) => RT } */
    debounce (func, delay, func2, ths) {
        if (typeof func !== 'function') return func
        if (typeof delay !== 'number' || isNaN(delay)) return func
        let time = 0
        return function () {
            let now = Date.now()
            if (now >= time) {
                time = now + delay
                return func.apply(ths, arguments)
            } else if (typeof func2 === 'function') {
                return func2.apply(ths, arguments)
            }
        }
    },
    /**
     * @param { string } screenName 
     * @returns { boolean }
     */
    isHUDScreen (screenName) {
        if (screenName === 'in_game_play_screen') return true
        if (screenName === 'hud_screen') return true
        return false
    },
    /**
     * @typedef { {
     *     setItem: (item: Nullable<ItemInstance>) => void
     *     setText: (text: string, color?: number) => void
     * } } SlotWithTextElement
     * @param { UI.ElementSet } elements 
     * @param { string } name 
     * @param { [x: number, y: number, size: number, bitmap?: string] } params 
     * @returns { SlotWithTextElement }
     */
    createSlotWithTextElement (elements, name, params) {
        elements[name + '_slot'] = {
            type: 'slot', visual: true, isDarkenAtZero: false,
            x: params[0], y: params[1], z: 1,
            size: params[2], bitmap: params[3] || 'clear',
            source: { id: 0, count: 0, data: 0 }
        }
        elements[name + '_text'] = {
            type: 'text',
            x: params[0] + 0.8 * params[2], y: params[1] + 0.55 * params[2], z: 2,
            font: { color: Color.WHITE, size: 0.25 * params[2], align: 2, shadow: 0.2 },
            text: ''
        }
        return {
            setItem (item) {
                if (!item) item = { id: 0, count: 0, data: 0 }
                if (elements[name + '_slot']) elements[name + '_slot'].source = item
                if (elements[name + '_text']) elements[name + '_text'].text = ''
            },
            setText (text, color) {
                if (color === void 0) color = Color.WHITE
                if (elements[name + '_slot'] && elements[name + '_slot'].source) elements[name + '_slot'].source.count = 1
                if (elements[name + '_text']) {
                    elements[name + '_text'].text = String(text)
                    elements[name + '_text'].font.color = color
                }
            }
        }
    },
    /**
     * @param { string } name 
     * @param { number } alpha [0, 255]
     * @returns { string }
     */
    cloneTextureWithAlpha (name, alpha) {
        if (!getContext()) return 'missing_texture'
        let bitmap = UI.TextureSource.getNullable(name)
        if (bitmap == null) return 'missing_texture'
        let targetBitmap = android.graphics.Bitmap.createBitmap(
            bitmap.getWidth(),
            bitmap.getHeight(),
            android.graphics.Bitmap.Config.ARGB_8888
        )
        let canvas = new android.graphics.Canvas(targetBitmap)
        let paint = new android.graphics.Paint()
        paint.setAlpha(alpha)
        canvas.drawBitmap(bitmap, 0, 0, paint)
        let newName = name + '-alpha=' + alpha
        UI.TextureSource.put(newName, targetBitmap)
        return newName
    },
    /**
     * @param { string } overlayName 
     * @param { string } backgroundName 
     * @param { { x?: number, y?: number, width?: number, height?: number, times?: number } = } params 
     * @returns { string }
     */
    mixTexture (overlayName, backgroundName, params) {
        if (!getContext()) return 'missing_texture'
        let overlay = UI.TextureSource.getNullable(overlayName)
        let background = UI.TextureSource.getNullable(backgroundName)
        if (!overlay && !background) return 'missing_texture'
        if (!overlay) return backgroundName
        if (!background) return overlayName
        if (!params) params = {}
        if (!params.x) params.x = 0
        if (!params.y) params.y = 0
        if (!params.width) params.width = 1
        if (!params.height) params.height = 1
        if (!params.times) params.times = 1
        let width = background.getWidth() * params.times
        let height = background.getHeight() * params.times
        if (params.x < 1) params.x *= width
        if (params.y < 1) params.y *= height
        if (params.width <= 1) params.width *= width
        if (params.height <= 1) params.height *= height
        let targetBitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888)
        let canvas = new android.graphics.Canvas(targetBitmap)
        canvas.drawBitmap(background, null, new android.graphics.RectF(0, 0, width, height), null)
        canvas.drawBitmap(overlay, null, new android.graphics.RectF(params.x, params.y, params.x + params.width, params.y + params.height), null)
        let newName = 'mix-' + overlayName + '-' + backgroundName + '-' + Math.floor(Math.random() * 1e5)
        UI.TextureSource.put(newName, targetBitmap)
        return newName
    },
    /**
     * @param { number = } player 
     * @returns { Array<Nullable<NBTItem>> }
     */
    getInventory (player) {
        let compoundTag = Entity.getCompoundTag(player || Player.get())
        let result = []
        let inventoryNBT = compoundTag.getListTagNoClone('Inventory')
        for (let slot = 0; slot < 36; ++slot) {
            try {
                let itemNBT = inventoryNBT && inventoryNBT.getCompoundTag(slot)
                result[slot] = {
                    ic: player ? new PlayerActor(player).getInventorySlot(slot) : Player.getInventorySlot(slot),
                    nbt: new ScriptableNBT.NBTCompoundValue(itemNBT)
                }
            } catch (err) {
                result[slot] = null
            }
        }
        return result
    },
    /**
     * @typedef { { ic: ItemInstance, nbt: ScriptableNBT.NBTCompoundValue } } NBTItem 
     * @param { number } slot 
     * @param { number = } player 
     * @returns { Nullable<NBTItem> }
     */
    getInventorySlot (slot, player) {
        slot |= 0
        if (!(0 <= slot && slot < 36)) return null
        try {
            return {
                ic: player ? new PlayerActor(player).getInventorySlot(slot) : Player.getInventorySlot(slot),
                nbt: ScriptableNBT.NBTValueFactory.getTagValue(Entity.getCompoundTag(player || Player.get()), 'Inventory', slot)
                    || new ScriptableNBT.NBTCompoundValue()
            }
        } catch (err) {
            return null
        }
    },
    /**
     * Attention that we only modified the count
     * @param { number } slot 
     * @param { number } player 
     * @param { Nullable<NBTItem> } nbtItem 
     */
    setInventorySlot (slot, player, nbtItem) {
        slot |= 0
        if (!(0 <= slot && slot < 36)) return
        if (!player) return
        try {
            if (nbtItem && nbtItem.ic) {
                if (Settings.stableMode || true) {
                    let item = nbtItem.ic
                    let maxDamage = Item.getMaxDamage(item.id)
                    if (maxDamage) item.data = this.getDamage(nbtItem)
                    new PlayerActor(player).setInventorySlot(slot, item.id, item.count, item.data, item.extra)
                } else {
                    // there are bugs in this part
                    // if (nbtItem.ic.count !== nbtItem.nbt.value['Count'].value) {
                    //     nbtItem.nbt.value['Count'].value = nbtItem.ic.count
                    // }
                    // nbtItem.nbt.value['Slot'] = new ScriptableNBT.NBTByteValue(slot)
                    // let compoundTag = Entity.getCompoundTag(player)
                    // let inventoryNBT = compoundTag.getListTagNoClone('Inventory')
                    // inventoryNBT.putCompoundTag(slot, nbtItem.nbt.compoundTag)
                    // Entity.setCompoundTag(player, compoundTag)
                }
            } else {
                new PlayerActor(player).setInventorySlot(slot, 0, 0, 0, null)
            }
        } catch (err) {
            return
        }
    },
    /**
     * @param { number = } player 
     * @returns { Nullable<NBTItem> }
     */
    getCarriedItem (player) {
        let slot = player ? new PlayerActor(player).getSelectedSlot() : Player.getSelectedSlotId()
        return this.getInventorySlot(slot, player)
    },
    /**
     * @param { number = } player 
     * @returns { Nullable<NBTItem> }
     */
    getOffhandItem (player) {
        if (typeof Entity.getOffhandItem !== 'function') return null
        try {
            if (!player) player = Player.get()
            return {
                ic:  Entity.getOffhandItem(player),
                nbt: ScriptableNBT.NBTValueFactory.getTagValue(Entity.getCompoundTag(player), 'Offhand', 0)
                    || new ScriptableNBT.NBTCompoundValue()
            }
        } catch (err) {
            return null
        }
    },
    /**
     * @param { number } slot 
     * @param { number = } player 
     * @returns { Nullable<NBTItem> }
     */
    getArmorSlot (slot, player) {
        slot |= 0
        if (!(0 <= slot && slot < 4)) return null
        try {
            if (!player) player = Player.get()
            return {
                ic: Entity.getArmorSlot(player, slot),
                nbt: ScriptableNBT.NBTValueFactory.getTagValue(Entity.getCompoundTag(player), 'Armor', slot)
                    || new ScriptableNBT.NBTCompoundValue()
            }
        } catch (err) {
            return null
        }
    },
    /**
     * @param { Nullable<ItemExtraData> | undefined } extra1 
     * @param { Nullable<ItemExtraData> | undefined } extra2 
     * @returns { boolean } 
     */
    isExtraEqual (extra1, extra2) {
        let empty1 = !extra1 || extra1.isEmpty()
        let empty2 = !extra2 || extra2.isEmpty()
        if (empty1 && empty2) return true
        if (empty1 || empty2) return false
        return extra1.equals(extra2)
    },
    /**
     * @param { Nullable<NBTItem> } item1 
     * @param { Nullable<NBTItem> } item2 
     */
    isItemStackable (item1, item2) {
        if (!item1 || !item1.ic || !item2 || !item2.ic) {
            let empty1 = !item1 || !item1.ic
            let empty2 = !item2 || !item2.ic
            return empty1 === empty2
        }
        if (item1.ic.id !== item2.ic.id || item1.ic.data !== item2.ic.data) return false
        if (Item.getMaxStack(item1.ic.id) === 1) return false
        if (!this.isExtraEqual(item1.ic.extra, item2.ic.extra)) return false
        return true
    },
    /**
     * @param { NBTItem } nbtItem 
     * @returns { number }
     */
    getDamage (nbtItem) {
        let damage = nbtItem.ic.data
        if (IsNewVersion && Item.isNativeItem(nbtItem.ic.id)) {
            /** @type { Nullable<ScriptableNBT.NBTCompoundValue> } */
            let tag = nbtItem.nbt.get('tag')
            let damageNBT = tag && tag.get('Damage')
            let value = damageNBT && damageNBT.value
            if (typeof value === 'number') {
                damage = Math.max(damage, value)
            }
        }
        return damage
    },
    /**
     * @param { Array<Nullable<NBTItem>> } inventory 
     * @returns { {[idData: `${number}:${number}`]: number} }
     */
    getSortInventory (inventory) {
        let sortInventory = {}
        inventory.forEach(function (nbtItem) {
            if (!nbtItem) return
            let item = nbtItem.ic
            if (!item || item.id === 0) return
            if (sortInventory[item.id + ':' + item.data]) {
                sortInventory[item.id + ':' + item.data] += item.count
                if (item.data !== -1) sortInventory[item.id + ':-1'] += item.count
            } else {
                sortInventory[item.id + ':' + item.data] = item.count
                sortInventory[item.id + ':-1'] = item.count
            }
        })
        return sortInventory
    },
    /**
     * @param { Array<Nullable<NBTItem>> } inventory 
     * @returns { Array<NBTItem> }
     */
    reduceInventory (inventory) {
        let that  = this
        /** @type { {[idData: `${number}:${number}`]: NBTItem[]} } */
        let inventoryObj = {}
        inventory.forEach(function (nbtItem) {
            if (!nbtItem) return
            let item = nbtItem.ic
            if (!item || item.id === 0) return
            /** @type { `${number}:${number}` } */
            let key = item.id + ':' + item.data
            if (!inventoryObj[key]) inventoryObj[key] = []
            let fail = inventoryObj[key].every(function (tNBTItem) {
                if (!that.isItemStackable(nbtItem, tNBTItem)) return true
                tNBTItem.ic.count += nbtItem.ic.count
                return false
            })
            if (fail) inventoryObj[key].push(nbtItem)
        })
        /** @type { Array<NBTItem> } */
        let ret = []
        for (let key in inventoryObj) {
            /** @type { Array<NBTItem> } */
            let itemList = inventoryObj[key]
            itemList.forEach(function (nbtItem) {
                let item = nbtItem.ic
                let maxStack = Item.getMaxStack(item.id)
                let count = item.count
                while (count > 0) {
                    let deltaCount = Math.min(count, maxStack)
                    let snbt = new ScriptableNBT.NBTCompoundValue(nbtItem.nbt.compoundTag)
                    snbt.value['Count'].value = deltaCount
                    ret.push({
                        ic: {
                            id: item.id,
                            count: deltaCount,
                            data: item.data,
                            extra: item.extra
                        },
                        nbt: snbt
                    })
                    count -= deltaCount
                }
            })
        }
        return ret
    },
    /** @readonly */
    defaultSortId: 'asc(id)',
    /** @type { {[sortId: string]: (a: NBTItem, b: NBTItem) => number} } */
    sortingFn: {},
    /**
     * @param { string } sortId 
     * @param { (a: NBTItem, b: NBTItem) => number } compareFn 
     */
    addSortingFn (sortId, compareFn) {
        if (typeof sortId !== 'string') return
        if (typeof compareFn !== 'function') return
        this.sortingFn[sortId] = compareFn
    },
    /**
     * @returns { Array<string> }
     */
    getSortIdList () {
        let ret = []
        for (let sortId in this.sortingFn) {
            if (typeof this.sortingFn[sortId] === 'function') {
                ret.push(sortId)
            }
        }
        return ret
    },
    /**
     * @param { string } sortId 
     * @returns { (a: NBTItem, b: NBTItem) => number }
     */
    getSortingFn (sortId) {
        if (typeof sortId !== 'string') return this.sortingFn[this.defaultSortId]
        if (typeof this.sortingFn[sortId] !== 'function') return this.sortingFn[this.defaultSortId]
        return this.sortingFn[sortId]
    }
}

Utils.addSortingFn(Utils.defaultSortId, function (a, b) {
    if (a.ic.id !== b.ic.id) return a.ic.id - b.ic.id
    if (a.ic.data !== b.ic.data) return a.ic.data - b.ic.data
    return b.ic.count - a.ic.count
})

Utils.addSortingFn('desc(id)', function (a, b) {
    if (a.ic.id !== b.ic.id) return b.ic.id - a.ic.id
    if (a.ic.data !== b.ic.data) return a.ic.data - b.ic.data
    return b.ic.count - a.ic.count
})
