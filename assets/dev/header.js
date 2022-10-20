/// <reference path='../declarations/core-engine.d.ts'/>
/// <reference path='../declarations/VanillaSlots.d.ts'/>
/// <reference path='./share.js'/>

const IsNewVersion = getMCPEVersion().array[1] >= 16
const Settings = {
    clientOnly: __config__.getBool('clientOnly'),
    transparency: Math.min(Math.max(__config__.getFloat('transparency'), 0.1), 1)
}

if (!Settings.clientOnly) IMPORT('VanillaSlots')

const Color = android.graphics.Color

/**
 * @param { string } message 
 * @param { Object } option 
 * @param { boolean = } option.log 
 * @param { boolean = } option.alert 
 * @param { boolean = } option.message 
 */
function Debug(message, option) {
    if (option.log) Logger.Log(message, 'DEBUG')
    if (option.alert) alert(message)
    if (option.message) Game.message(message)
}

/**
 * @param { string } screenName 
 * @returns { boolean }
 */
function IsHUDScreen(screenName) {
    if (screenName === 'in_game_play_screen') return true
    if (screenName === 'hud_screen') return true
    return false
}

/** @type { (entity: number) => ItemInstance } */
const GetOffhandItem = Entity.getOffhandItem
    || function (entity) { return { id: 0, count: 0, data: 0 } }

/**
 * @param { Array<ItemInstance> } inventory 
 * @returns { { [idData: `${number}:${number}`]: number; } }
 */
function GetSortInventory (inventory) {
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
}

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
function CreateSlotWithTextElement(elements, name, params) {
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
}

/**
 * @param { string } name 
 * @param { number } alpha [0, 255]
 * @returns { string }
 */
function CloneTextureWithAlpha(name, alpha) {
    let bitmap = UI.TextureSource.getNullable(name)
    if (bitmap === null) return
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
}
