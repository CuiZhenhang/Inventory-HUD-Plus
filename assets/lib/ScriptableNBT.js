// Copyright (c) 2022 CuiZhenhang (github.com/CuiZhenhang)
LIBRARY({
    name: 'ScriptableNBT',
    version: 1,
    api: 'CoreEngine',
    shared: true
});
var ScriptableNBT;
(function (ScriptableNBT) {
    var NBTByteValue = /** @class */ (function () {
        function NBTByteValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_BYTE;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTByteValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                if (typeof value === 'boolean')
                    value = +value;
                if (typeof value !== 'number')
                    return;
                if (value % 1)
                    value = Math.floor(value);
                if (value < NBTByteValue.MIN)
                    value = NBTByteValue.MIN;
                if (value > NBTByteValue.MAX)
                    value = NBTByteValue.MAX;
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        NBTByteValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getByte(key);
        };
        NBTByteValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putByte(key, this.value);
        };
        NBTByteValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getByte(index);
        };
        NBTByteValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putByte(index, this.value);
        };
        NBTByteValue.MIN = -128;
        NBTByteValue.MAX = 127;
        return NBTByteValue;
    }());
    ScriptableNBT.NBTByteValue = NBTByteValue;
    var NBTShortValue = /** @class */ (function () {
        function NBTShortValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_SHORT;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTShortValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                if (typeof value !== 'number')
                    return;
                if (value % 1)
                    value = Math.floor(value);
                if (value < NBTShortValue.MIN)
                    value = NBTShortValue.MIN;
                if (value > NBTShortValue.MAX)
                    value = NBTShortValue.MAX;
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        NBTShortValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getShort(key);
        };
        NBTShortValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putShort(key, this.value);
        };
        NBTShortValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getShort(index);
        };
        NBTShortValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putShort(index, this.value);
        };
        NBTShortValue.MIN = -32768;
        NBTShortValue.MAX = 32767;
        return NBTShortValue;
    }());
    ScriptableNBT.NBTShortValue = NBTShortValue;
    var NBTIntValue = /** @class */ (function () {
        function NBTIntValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_INT;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTIntValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                if (typeof value !== 'number')
                    return;
                if (value % 1)
                    value = Math.floor(value);
                if (value < NBTIntValue.MIN)
                    value = NBTIntValue.MIN;
                if (value > NBTIntValue.MAX)
                    value = NBTIntValue.MAX;
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        NBTIntValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getInt(key);
        };
        NBTIntValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putInt(key, this.value);
        };
        NBTIntValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getInt(index);
        };
        NBTIntValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putInt(index, this.value);
        };
        NBTIntValue.MIN = -2147483648;
        NBTIntValue.MAX = 2147483647;
        return NBTIntValue;
    }());
    ScriptableNBT.NBTIntValue = NBTIntValue;
    var NBTInt64Value = /** @class */ (function () {
        function NBTInt64Value(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_INT64;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTInt64Value.prototype, "value", {
            get: function () {
                if (this._value === null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    return this._value.longValue();
                }
                else {
                    return this._value;
                }
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                // @ts-ignore
                if (value.getClass) {
                    this._value = value;
                }
                else {
                    if (typeof value !== 'number')
                        return;
                    if (value % 1)
                        value = Math.floor(value);
                    if (value < NBTInt64Value.MIN)
                        value = NBTInt64Value.MIN;
                    if (value > NBTInt64Value.MAX)
                        value = NBTInt64Value.MAX;
                    this._value = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NBTInt64Value.prototype, "longValue", {
            /**
             * Get the Scriptable NBT data as [[java.lang.Long]]
             */
            get: function () {
                if (this._value === null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    return this._value;
                }
                else {
                    return java.lang.Long.valueOf(this._value);
                }
            },
            enumerable: false,
            configurable: true
        });
        NBTInt64Value.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getInt64(key);
        };
        NBTInt64Value.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putInt64(key, this.value);
        };
        NBTInt64Value.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getInt64(index);
        };
        NBTInt64Value.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putInt64(index, this.value);
        };
        NBTInt64Value.MIN = -9223372036854775808; // not a safe integer
        NBTInt64Value.MAX = 9223372036854775807; // not a safe integer
        return NBTInt64Value;
    }());
    ScriptableNBT.NBTInt64Value = NBTInt64Value;
    var NBTFloatValue = /** @class */ (function () {
        function NBTFloatValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_FLOAT;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTFloatValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                if (typeof value !== 'number')
                    return;
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        NBTFloatValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getFloat(key);
        };
        NBTFloatValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putFloat(key, this.value);
        };
        NBTFloatValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getFloat(index);
        };
        NBTFloatValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putFloat(index, this.value);
        };
        return NBTFloatValue;
    }());
    ScriptableNBT.NBTFloatValue = NBTFloatValue;
    var NBTDoubleValue = /** @class */ (function () {
        function NBTDoubleValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_DOUBLE;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTDoubleValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                if (typeof value !== 'number')
                    return;
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        NBTDoubleValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getDouble(key);
        };
        NBTDoubleValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putDouble(key, this.value);
        };
        NBTDoubleValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getDouble(index);
        };
        NBTDoubleValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putDouble(index, this.value);
        };
        return NBTDoubleValue;
    }());
    ScriptableNBT.NBTDoubleValue = NBTDoubleValue;
    var NBTStringValue = /** @class */ (function () {
        function NBTStringValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_STRING;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTStringValue.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                this._value = String(value);
            },
            enumerable: false,
            configurable: true
        });
        NBTStringValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getString(key);
        };
        NBTStringValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            if (this.value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putString(key, this.value);
        };
        NBTStringValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getString(index);
        };
        NBTStringValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            if (this.value === null)
                return;
            listTag.putString(index, this.value);
        };
        return NBTStringValue;
    }());
    ScriptableNBT.NBTStringValue = NBTStringValue;
    var NBTListValue = /** @class */ (function () {
        function NBTListValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_LIST;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTListValue.prototype, "value", {
            get: function () {
                if (this._value === null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    var listTag = this._value;
                    this._value = [];
                    var length = listTag.length();
                    for (var index = 0; index < length; ++index) {
                        var type = listTag.getValueType(index);
                        var temp = NBTValueFactory.createNBTValue(type);
                        if (!temp)
                            continue;
                        temp.fromListTag(listTag, index);
                        this._value[index] = temp;
                    }
                }
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                // @ts-ignore
                if (value.getClass) {
                    this._value = value;
                }
                else {
                    if (!Array.isArray(value))
                        return;
                    this._value = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NBTListValue.prototype, "listTag", {
            /**
             * Get the Scriptable NBT data as [[NBT.ListTag]]
             */
            get: function () {
                if (this._value === null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    // @ts-ignore
                    return new NBT.ListTag(this._value);
                }
                else {
                    var listTag = new NBT.ListTag();
                    var value = this._value;
                    for (var index = 0; index < value.length; ++index) {
                        if (value[index]) {
                            value[index].applyToListTag(listTag, index);
                        }
                    }
                    return listTag;
                }
            },
            enumerable: false,
            configurable: true
        });
        NBTListValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getListTagNoClone(key);
        };
        NBTListValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            var value = this.listTag;
            if (value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putListTag(key, value);
        };
        NBTListValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getListTagNoClone(index);
        };
        NBTListValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            var value = this.listTag;
            if (value === null)
                return;
            listTag.putListTag(index, value);
        };
        return NBTListValue;
    }());
    ScriptableNBT.NBTListValue = NBTListValue;
    var NBTCompoundValue = /** @class */ (function () {
        function NBTCompoundValue(value) {
            if (value === void 0) { value = null; }
            this.type = ENbtDataType.TYPE_COMPOUND;
            this._value = null;
            this.value = value;
        }
        Object.defineProperty(NBTCompoundValue.prototype, "value", {
            get: function () {
                if (this._value === null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    var compoundTag = this._value;
                    this._value = {};
                    var keys = compoundTag.getAllKeys();
                    for (var index = 0; index < keys.length; ++index) {
                        var key = String(keys[index]);
                        var type = compoundTag.getValueType(key);
                        var temp = NBTValueFactory.createNBTValue(type);
                        if (!temp)
                            continue;
                        temp.fromCompoundTag(compoundTag, key);
                        this._value[key] = temp;
                    }
                }
                return this._value;
            },
            set: function (value) {
                if (value === null) {
                    this._value = null;
                    return;
                }
                // @ts-ignore
                if (value.getClass) {
                    this._value = value;
                }
                else {
                    if (typeof value !== 'object')
                        return;
                    this._value = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NBTCompoundValue.prototype, "compoundTag", {
            /**
             * Get the Scriptable NBT data as [[NBT.CompoundTag]]
             */
            get: function () {
                if (this._value === null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    return new NBT.CompoundTag(this._value);
                }
                else {
                    var compoundTag = new NBT.CompoundTag();
                    var value = this._value;
                    for (var key in value) {
                        if (value[key]) {
                            value[key].applyToCompoundTag(compoundTag, key);
                        }
                    }
                    return compoundTag;
                }
            },
            enumerable: false,
            configurable: true
        });
        NBTCompoundValue.prototype.fromCompoundTag = function (compoundTag, key) {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null;
                return;
            }
            this.value = compoundTag.getCompoundTagNoClone(key);
        };
        NBTCompoundValue.prototype.applyToCompoundTag = function (compoundTag, key) {
            var value = this.compoundTag;
            if (value === null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putCompoundTag(key, value);
        };
        NBTCompoundValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length()) {
                this.value = null;
                return;
            }
            this.value = listTag.getCompoundTagNoClone(index);
        };
        NBTCompoundValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0)
                return;
            var value = this.compoundTag;
            if (value === null)
                return;
            listTag.putCompoundTag(index, value);
        };
        return NBTCompoundValue;
    }());
    ScriptableNBT.NBTCompoundValue = NBTCompoundValue;
    var NBTValueFactory = /** @class */ (function () {
        function NBTValueFactory() {
        }
        NBTValueFactory.createNBTValue = function (type, value) {
            switch (type) {
                case ENbtDataType.TYPE_BYTE: return new NBTByteValue(value);
                case ENbtDataType.TYPE_SHORT: return new NBTShortValue(value);
                case ENbtDataType.TYPE_INT: return new NBTIntValue(value);
                case ENbtDataType.TYPE_INT64: return new NBTInt64Value(value);
                case ENbtDataType.TYPE_FLOAT: return new NBTFloatValue(value);
                case ENbtDataType.TYPE_DOUBLE: return new NBTDoubleValue(value);
                case ENbtDataType.TYPE_STRING: return new NBTStringValue(value);
                case ENbtDataType.TYPE_LIST: return new NBTListValue(value);
                case ENbtDataType.TYPE_COMPOUND: return new NBTCompoundValue(value);
            }
            return null;
        };
        /**
         * Get NBT value of specified key as Scriptable NBT data
         * @param compoundTag source compound tag
         * @param key the specified key
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.
         */
        NBTValueFactory.getCompoundTagValue = function (compoundTag, key) {
            var type = compoundTag.getValueType(key);
            var value = NBTValueFactory.createNBTValue(type);
            if (!value)
                return null;
            value.fromCompoundTag(compoundTag, key);
            return value;
        };
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param listTag source list tag
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.
         */
        NBTValueFactory.getListTagValue = function (listTag, index) {
            if (index < 0 || index >= listTag.length())
                return null;
            var type = listTag.getValueType(index);
            var value = NBTValueFactory.createNBTValue(type);
            if (!value)
                return null;
            value.fromListTag(listTag, index);
            return value;
        };
        NBTValueFactory.parseJson = function (json) {
            if (Array.isArray(json)) {
                // @ts-ignore
                var array = json.map(function (obj) {
                    if (obj.t === ENbtDataType.TYPE_LIST || obj.t === ENbtDataType.TYPE_COMPOUND) {
                        return NBTValueFactory.parseJson(obj.v);
                    }
                    else {
                        return NBTValueFactory.createNBTValue(obj.t, obj.v);
                    }
                });
                return NBTValueFactory.createNBTValue(ENbtDataType.TYPE_LIST, array);
            }
            else {
                var object = {};
                for (var key in json) {
                    var obj = json[key];
                    if (obj.t === ENbtDataType.TYPE_LIST || obj.t === ENbtDataType.TYPE_COMPOUND) {
                        // @ts-ignore
                        object[key] = NBTValueFactory.parseJson(obj.v);
                    }
                    else {
                        // @ts-ignore
                        object[key] = NBTValueFactory.createNBTValue(obj.t, obj.v);
                    }
                }
                return NBTValueFactory.createNBTValue(ENbtDataType.TYPE_COMPOUND, object);
            }
        };
        NBTValueFactory.toJson = function (value) {
            var _a;
            if (value.type === ENbtDataType.TYPE_LIST) {
                var json = ((_a = value.value) === null || _a === void 0 ? void 0 : _a.map(function (child) {
                    if (!child)
                        return { t: 0, v: null };
                    if (child.type === ENbtDataType.TYPE_LIST) {
                        return {
                            t: child.type,
                            v: NBTValueFactory.toJson(child)
                        };
                    }
                    else if (child.type === ENbtDataType.TYPE_COMPOUND) {
                        return {
                            t: child.type,
                            v: NBTValueFactory.toJson(child)
                        };
                    }
                    else {
                        return {
                            t: child.type,
                            v: child.value
                        };
                    }
                })) || [];
                return json;
            }
            else {
                var json = {};
                if (value.value) {
                    for (var key in value.value) {
                        var child = value.value[key];
                        if (!child)
                            continue;
                        if (child.type === ENbtDataType.TYPE_LIST) {
                            json[key] = {
                                t: child.type,
                                v: NBTValueFactory.toJson(child)
                            };
                        }
                        else if (child.type === ENbtDataType.TYPE_COMPOUND) {
                            json[key] = {
                                t: child.type,
                                v: NBTValueFactory.toJson(child)
                            };
                        }
                        else {
                            json[key] = {
                                t: child.type,
                                v: child.value
                            };
                        }
                    }
                }
                return json;
            }
        };
        return NBTValueFactory;
    }());
    ScriptableNBT.NBTValueFactory = NBTValueFactory;
})(ScriptableNBT || (ScriptableNBT = {}));
EXPORT('ScriptableNBT', ScriptableNBT);
