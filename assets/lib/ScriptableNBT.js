// Copyright (c) 2022-2024 CuiZhenhang (github.com/CuiZhenhang)
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
LIBRARY({
    name: 'ScriptableNBT',
    version: 2,
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
                if (value == null) {
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putByte(key, this.value);
        };
        NBTByteValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getByte(index);
        };
        NBTByteValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
                if (value == null) {
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putShort(key, this.value);
        };
        NBTShortValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getShort(index);
        };
        NBTShortValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
                if (value == null) {
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putInt(key, this.value);
        };
        NBTIntValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getInt(index);
        };
        NBTIntValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
                if (this._value == null)
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
                if (value == null) {
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
                if (this._value == null)
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putInt64(key, this.value);
        };
        NBTInt64Value.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getInt64(index);
        };
        NBTInt64Value.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
                if (value == null) {
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putFloat(key, this.value);
        };
        NBTFloatValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getFloat(index);
        };
        NBTFloatValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
                if (value == null) {
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putDouble(key, this.value);
        };
        NBTDoubleValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getDouble(index);
        };
        NBTDoubleValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
                if (value == null) {
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
            if (this.value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putString(key, this.value);
        };
        NBTStringValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getString(index);
        };
        NBTStringValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            if (this.value == null)
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
            /**
             * Get the Scriptable NBT data.\
             * **Attention**, the operation `get` will create a instance for each of its child elements,
             * which could lead to a performance issue if unproperly used.\
             * Consider using `NBTListValue.get` instead.
             */
            get: function () {
                if (this._value == null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    var listTag = this._value;
                    this._value = [];
                    var length = listTag.length();
                    for (var index = 0; index < length; ++index) {
                        var type = listTag.getValueType(index);
                        var temp = NBTValueFactory.createNBTValue(type);
                        if (!temp) {
                            if (type)
                                Logger.Log("ScriptableNBT: Unknown NBT type in listTag. (type number is ".concat(type, ")"), 'WARN');
                            continue;
                        }
                        temp.fromListTag(listTag, index);
                        this._value[index] = temp;
                    }
                }
                return this._value;
            },
            set: function (value) {
                if (value == null) {
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
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        NBTListValue.prototype.get = function (index) {
            if (this._value == null)
                return null;
            if (index < 0)
                return null;
            // @ts-ignore
            if (this._value.getClass) {
                var listTag = this._value;
                if (index >= listTag.length() || index % 1 !== 0)
                    return null;
                var type = listTag.getValueType(index);
                var temp = NBTValueFactory.createNBTValue(type);
                if (!temp) {
                    if (type)
                        Logger.Log("ScriptableNBT: Unknown NBT type in listTag. (type number is ".concat(type, ")"), 'WARN');
                    return null;
                }
                temp.fromListTag(listTag, index);
                return temp || null;
            }
            else {
                return this._value[index];
            }
        };
        Object.defineProperty(NBTListValue.prototype, "listTag", {
            /**
             * Get the Scriptable NBT data as [[NBT.ListTag]]. It's a clone.
             */
            get: function () {
                if (this._value == null)
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
            if (value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putListTag(key, value);
        };
        NBTListValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getListTagNoClone(index);
        };
        NBTListValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            var value = this.listTag;
            if (value == null)
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
            /**
             * Get the Scriptable NBT data.\
             * **Attention**, the operation `get` will create a instance for each of its child elements,
             * which could lead to a performance issue if unproperly used.\
             * Consider using `NBTCompoundValue.get` instead.
             */
            get: function () {
                if (this._value == null)
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
                        if (!temp) {
                            if (type)
                                Logger.Log("ScriptableNBT: Unknown NBT type in compoundTag. (type number is ".concat(type, ")"), 'WARN');
                            continue;
                        }
                        temp.fromCompoundTag(compoundTag, key);
                        this._value[key] = temp;
                    }
                }
                return this._value;
            },
            set: function (value) {
                if (value == null) {
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
        /**
         * Get NBT value of specified key as Scriptable NBT data
         * @param key the specified key
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        NBTCompoundValue.prototype.get = function (key) {
            if (this._value == null)
                return null;
            // @ts-ignore
            if (this._value.getClass) {
                var compoundTag = this._value;
                if (!compoundTag.contains(key))
                    return null;
                var type = compoundTag.getValueType(key);
                var temp = NBTValueFactory.createNBTValue(type);
                if (!temp) {
                    if (type)
                        Logger.Log("ScriptableNBT: Unknown NBT type in compoundTag. (type number is ".concat(type, ")"), 'WARN');
                    return null;
                }
                temp.fromCompoundTag(compoundTag, key);
                return temp;
            }
            return this._value[key] || null;
        };
        Object.defineProperty(NBTCompoundValue.prototype, "compoundTag", {
            /**
             * Get the Scriptable NBT data as [[NBT.CompoundTag]]. It's a clone.
             */
            get: function () {
                if (this._value == null)
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
        Object.defineProperty(NBTCompoundValue.prototype, "refCompoundTag", {
            /**
             * Get the Scriptable NBT data as [[NBT.CompoundTag]]. It's a reference.\
             * If the type of inner value is not [[NBT.CompoundTag]], null is returned.
             */
            get: function () {
                if (this._value == null)
                    return null;
                // @ts-ignore
                if (this._value.getClass) {
                    return this._value;
                }
                return null;
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
            if (value == null) {
                compoundTag.remove(key);
                return;
            }
            compoundTag.putCompoundTag(key, value);
        };
        NBTCompoundValue.prototype.fromListTag = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null;
                return;
            }
            this.value = listTag.getCompoundTagNoClone(index);
        };
        NBTCompoundValue.prototype.applyToListTag = function (listTag, index) {
            if (index < 0 || index % 1 !== 0)
                return;
            var value = this.compoundTag;
            if (value == null)
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
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        NBTValueFactory.getCompoundTagValue = function (compoundTag, key) {
            if (!compoundTag.contains(key))
                return null;
            var type = compoundTag.getValueType(key);
            var value = NBTValueFactory.createNBTValue(type);
            if (!value) {
                if (type)
                    Logger.Log("ScriptableNBT: Unknown NBT type in compoundTag. (type number is ".concat(type, ")"), 'WARN');
                return null;
            }
            value.fromCompoundTag(compoundTag, key);
            return value;
        };
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param listTag source list tag
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        NBTValueFactory.getListTagValue = function (listTag, index) {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0)
                return null;
            var type = listTag.getValueType(index);
            var value = NBTValueFactory.createNBTValue(type);
            if (!value) {
                if (type)
                    Logger.Log("ScriptableNBT: Unknown NBT type in listTag. (type number is ".concat(type, ")"), 'WARN');
                return null;
            }
            value.fromListTag(listTag, index);
            return value;
        };
        /**
         * Get NBT of specified keys and indexes
         * @param tag source compound tag or list tag
         * @param args the specified keys and indexes
         * @returns a reference to the compound tag or list tag
         */
        NBTValueFactory.getTag = function (tag) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var key = args_1[_a];
                if (typeof key === 'string') {
                    // @ts-ignore
                    if (!tag.getClass || !tag.contains)
                        return null;
                    tag = tag;
                    if (!tag.contains(key))
                        return null;
                    var type = tag.getValueType(key);
                    if (type === ENbtDataType.TYPE_COMPOUND)
                        tag = tag.getCompoundTagNoClone(key);
                    else if (type === ENbtDataType.TYPE_LIST)
                        tag = tag.getListTagNoClone(key);
                    else
                        return null;
                }
                else if (typeof key === 'number') {
                    // @ts-ignore
                    if (!tag.getClass || !tag.length)
                        return null;
                    tag = tag;
                    if (key < 0 || key >= tag.length() || key % 1 !== 0)
                        return null;
                    var type = tag.getValueType(key);
                    if (type === ENbtDataType.TYPE_COMPOUND)
                        tag = tag.getCompoundTagNoClone(key);
                    else if (type === ENbtDataType.TYPE_LIST)
                        tag = tag.getListTagNoClone(key);
                    else
                        return null;
                }
                else {
                    return null;
                }
            }
            return tag;
        };
        /**
         * Get NBT value of specified keys and indexes as Scriptable NBT data
         * @param tag source compound tag or list tag
         * @param args the specified keys and indexes. Should not be empty.
         * @returns Scriptable NBT data if specified index exists in list tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        NBTValueFactory.getTagValue = function (tag) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!args.length)
                return null;
            var lastKey = args[args.length - 1];
            args.pop();
            var temp = this.getTag.apply(this, __spreadArray([tag], args, false));
            if (!temp)
                return null;
            if (typeof lastKey === 'string') {
                // @ts-ignore
                if (!temp.getClass || !temp.contains)
                    return null;
                return this.getCompoundTagValue(temp, lastKey);
            }
            else if (typeof lastKey === 'number') {
                // @ts-ignore
                if (!temp.getClass || !temp.length)
                    return null;
                return this.getListTagValue(temp, lastKey);
            }
            else {
                return null;
            }
        };
        /**
         * Set NBT value of specified keys and indexes by Scriptable NBT data
         * @param tag source compound tag or list tag
         * @param value Scriptable NBT data
         * @param args the specified keys and indexes. Should not be empty.
         */
        NBTValueFactory.setTagValue = function (tag, value) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!args.length)
                return;
            var lastKey = args[args.length - 1];
            args.pop();
            var temp = this.getTag.apply(this, __spreadArray([tag], args, false));
            if (!temp)
                return;
            if (typeof lastKey === 'string') {
                // @ts-ignore
                if (!temp.getClass || !temp.contains)
                    return;
                value.applyToCompoundTag(temp, lastKey);
            }
            else if (typeof lastKey === 'number') {
                // @ts-ignore
                if (!temp.getClass || !temp.length)
                    return;
                value.applyToListTag(temp, lastKey);
            }
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
