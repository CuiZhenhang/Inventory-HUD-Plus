/// <reference path='../declarations/core-engine.d.ts'/>
/// <reference path='../declarations/VanillaSlots.d.ts'/>
/// <reference path='./share.js'/>

const IsNewVersion = getMCPEVersion().array[1] >= 16
const Settings = {
    clientOnly: __config__.getBool('clientOnly'),
    opacity: Math.min(Math.max(__config__.getFloat('opacity'), 0.1), 1),
    sortId: String(__config__.getString('sortId')),
    information: {
        alwaysOpen: __config__.getBool('information.alwaysOpen'),
        x: __config__.getFloat('information.x'),
        y: __config__.getFloat('information.y'),
        width: __config__.getFloat('information.width')
    },
    inventory: {
        x: __config__.getFloat('inventory.x'),
        y: __config__.getFloat('inventory.y'),
        width: __config__.getFloat('inventory.width')
    }
}

if (!Settings.clientOnly) IMPORT('VanillaSlots:3')

const Color = android.graphics.Color

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
    /** @type { <T extends any[], RT = any, TT = any>(func: (this: TT, ...args: T) => RT, wait: number, func2?: Nullable<(this: TT, ...args: T) => RT>, ths?: TT): (...args: T) => RT } */
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
            x: params[0] + 0.8 * params[2], y: params[1] + 0.5 * params[2], z: 2,
            font: { color: Color.WHITE, size: 0.3 * params[2], align: 2 },
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
        let bitmap = UI.TextureSource.getNullable(name)
        if (bitmap === null) return 'missing_texture'
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
    /** @type { (entity: number) => ItemInstance } */
    getOffhandItem: Entity.getOffhandItem || function (entity) { return { id: 0, count: 0, data: 0 } },
    /**
     * @param { Array<ItemInstance> } inventory 
     * @returns { {[idData: `${number}:${number}`]: number} }
     */
    getSortInventory (inventory) {
        let sortInventory = {}
        inventory.forEach(function (item) {
            if (item.id === 0) return
            if (sortInventory[item.id + ':' + item.data]) {
                sortInventory[item.id + ':' + item.data] += item.count
                if(item.data !== -1) sortInventory[item.id + ':-1'] += item.count
            } else {
                sortInventory[item.id + ':' + item.data] = item.count
                sortInventory[item.id + ':-1'] = item.count
            }
        })
        return sortInventory
    },
    /**
     * @param { Array<ItemInstance> } inventory 
     * @returns { Array<ItemInstance> }
     */
    reduceInventory (inventory) {
        /** @type { {[idData: `${number}:${number}`]: ItemInstance[]} } */
        let inventoryObj = {}
        inventory.forEach(function (item) {
            if (item.id === 0) return
            /** @type { `${number}:${number}` } */
            let key = item.id + ':' + item.data
            if (!inventoryObj[key]) {
                inventoryObj[key] = [{
                    id: item.id,
                    count: 0,
                    data: item.data
                }]
            }
            if (!item.extra || item.extra.isEmpty()) {
                inventoryObj[key][0].count += item.count
            } else {
                let extra = item.extra
                let succ = inventoryObj[key].some(function (tItem) {
                    if (tItem.extra && extra.equals(tItem.extra)) {
                        tItem.count += item.count
                        return true
                    }
                })
                if (!succ) {
                    inventoryObj[key].push({
                        id: item.id,
                        count: item.count,
                        data: item.data,
                        extra: item.extra
                    })
                }
            }
        })
        /** @type { Array<ItemInstance> } */
        let ret = []
        for (let key  in inventoryObj) {
            /** @type { Array<ItemInstance> } */
            let itemList = inventoryObj[key]
            itemList.forEach(function (item) {
                if (!item.count) return
                let maxStack = Item.getMaxStack(item.id)
                let count = item.count
                while (count > 0) {
                    let deltaCount = Math.min(count, maxStack)
                    ret.push({
                        id: item.id,
                        count: deltaCount,
                        data: item.data,
                        extra: item.extra
                    })
                    count -= deltaCount
                }
            })
        }
        return ret
    },
    /** @readonly */
    defaultSortId: 'asc(id)',
    /** @type { {[sortId: string]: (a: ItemInstance, b: ItemInstance) => number} } */
    sortingFn: {},
    /**
     * @param { string } sortId 
     * @param { (a: ItemInstance, b: ItemInstance) => number } compareFn 
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
     * @returns { (a: ItemInstance, b: ItemInstance) => number }
     */
    getSortingFn (sortId) {
        if (typeof sortId !== 'string') return this.sortingFn[this.defaultSortId]
        if (typeof this.sortingFn[sortId] !== 'function') return this.sortingFn[this.defaultSortId]
        return this.sortingFn[sortId]
    }
}

Utils.addSortingFn(Utils.defaultSortId, function (a, b) {
    if (a.id !== b.id) return a.id - b.id
    if (a.data !== b.data) return a.data - b.data
    return b.count - a.count
})

Utils.addSortingFn('desc(id)', function (a, b) {
    if (a.id !== b.id) return b.id - a.id
    if (a.data !== b.data) return a.data - b.data
    return b.count - a.count
})
