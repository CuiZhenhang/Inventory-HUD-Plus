/// <reference path='./core-engine.d.ts'/>

declare namespace ScriptableNBT {
    interface INBTValue<T> {
        /**
         * NBT data type
         */
        readonly type: ENbtDataType;
        /**
         * Get the Scriptable NBT data
         */
        get value(): Nullable<T>;
        /**
         * Set the Scriptable NBT data.\
         * With automatic check for type and range.
         */
        set value(value: Nullable<T>);
        /**
         * Set the Scriptable NBT data from compound tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         * @param compoundTag source compound tag
         * @param key for the specified key
         */
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        /**
         * Apply the Scriptable NBT data to compound tag
         * @param compoundTag target compound tag
         * @param key for the specified key
         */
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        /**
         * Set the Scriptable NBT data from list tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         * @param listTag source list tag
         * @param index for the specified index
         */
        fromListTag(listTag: NBT.ListTag, index: number): void;
        /**
         * Apply the Scriptable NBT data to list tag
         * @param listTag target list tag
         * @param index for the specified index
         */
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTByteValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_BYTE;
        private static readonly MIN;
        private static readonly MAX;
        private _value;
        constructor(value?: Nullable<number>);
        get value(): Nullable<number>;
        set value(value: Nullable<number | boolean>);
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTShortValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_SHORT;
        private static readonly MIN;
        private static readonly MAX;
        private _value;
        constructor(value?: Nullable<number>);
        get value(): Nullable<number>;
        set value(value: Nullable<number>);
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTIntValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_INT;
        private static readonly MIN;
        private static readonly MAX;
        private _value;
        constructor(value?: Nullable<number>);
        get value(): Nullable<number>;
        set value(value: Nullable<number>);
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTInt64Value implements INBTValue<number | java.lang.Long> {
        readonly type = ENbtDataType.TYPE_INT64;
        private static readonly MIN;
        private static readonly MAX;
        private _value;
        constructor(value?: Nullable<number | java.lang.Long>);
        get value(): Nullable<number>;
        set value(value: Nullable<number | java.lang.Long>);
        /**
         * Get the Scriptable NBT data as [[java.lang.Long]]
         */
        get longValue(): Nullable<java.lang.Long>;
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTFloatValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_FLOAT;
        private _value;
        constructor(value?: Nullable<number>);
        get value(): Nullable<number>;
        set value(value: Nullable<number>);
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTDoubleValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_DOUBLE;
        private _value;
        constructor(value?: Nullable<number>);
        get value(): Nullable<number>;
        set value(value: Nullable<number>);
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTStringValue implements INBTValue<string> {
        readonly type = ENbtDataType.TYPE_STRING;
        private _value;
        constructor(value?: Nullable<string>);
        get value(): Nullable<string>;
        set value(value: Nullable<string>);
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTListValue implements INBTValue<Array<INBTValue<any>> | NBT.ListTag> {
        readonly type = ENbtDataType.TYPE_LIST;
        private _value;
        constructor(value?: Nullable<Array<INBTValue<any>> | NBT.ListTag>);
        /**
         * Get the Scriptable NBT data.\
         * **Attention**, the operation `get` will create a instance for each of its child elements,
         * which could lead to a performance issue if unproperly used.\
         * Consider using `NBTListValue.get` instead.
         */
        get value(): Nullable<Array<INBTValue<any>>>;
        set value(value: Nullable<Array<INBTValue<any>> | NBT.ListTag>);
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        get(index: number): Nullable<INBTValue<any>>;
        /**
         * Get the Scriptable NBT data as [[NBT.ListTag]]. It's a clone.
         */
        get listTag(): Nullable<NBT.ListTag>;
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    class NBTCompoundValue implements INBTValue<{
        [key: string]: INBTValue<any>;
    } | NBT.CompoundTag> {
        readonly type = ENbtDataType.TYPE_COMPOUND;
        private _value;
        constructor(value?: Nullable<{
            [key: string]: INBTValue<any>;
        } | NBT.CompoundTag>);
        /**
         * Get the Scriptable NBT data.\
         * **Attention**, the operation `get` will create a instance for each of its child elements,
         * which could lead to a performance issue if unproperly used.\
         * Consider using `NBTCompoundValue.get` instead.
         */
        get value(): Nullable<{
            [key: string]: INBTValue<any>;
        }>;
        set value(value: Nullable<{
            [key: string]: INBTValue<any>;
        } | NBT.CompoundTag>);
        /**
         * Get NBT value of specified key as Scriptable NBT data
         * @param key the specified key
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        get(key: string): Nullable<INBTValue<any>>;
        /**
         * Get the Scriptable NBT data as [[NBT.CompoundTag]]. It's a clone.
         */
        get compoundTag(): Nullable<NBT.CompoundTag>;
        /**
         * Get the Scriptable NBT data as [[NBT.CompoundTag]]. It's a reference.\
         * If the type of inner value is not [[NBT.CompoundTag]], null is returned.
         */
        get refCompoundTag(): Nullable<NBT.CompoundTag>;
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void;
        fromListTag(listTag: NBT.ListTag, index: number): void;
        applyToListTag(listTag: NBT.ListTag, index: number): void;
    }
    type JsonListTag = Array<{
        t: ENbtDataType;
        v: any;
    }>;
    type JsonCompoundTag = {
        [key: string]: {
            t: ENbtDataType;
            v: any;
        };
    };
    class NBTValueFactory {
        /**
         * create Scriptable NBT data of specified NBT data type
         * @param type NBT data type
         * @param value NBT value or Scriptable data. Default is null.
         * @returns Scriptable NBT data if the NBT data type is implemented. Otherwise is null.
         */
        static createNBTValue(type: ENbtDataType.TYPE_BYTE, value?: Nullable<number>): NBTByteValue;
        static createNBTValue(type: ENbtDataType.TYPE_SHORT, value?: Nullable<number>): NBTShortValue;
        static createNBTValue(type: ENbtDataType.TYPE_INT, value?: Nullable<number>): NBTIntValue;
        static createNBTValue(type: ENbtDataType.TYPE_INT64, value?: Nullable<number | java.lang.Long>): NBTInt64Value;
        static createNBTValue(type: ENbtDataType.TYPE_FLOAT, value?: Nullable<number>): NBTFloatValue;
        static createNBTValue(type: ENbtDataType.TYPE_DOUBLE, value?: Nullable<number>): NBTDoubleValue;
        static createNBTValue(type: ENbtDataType.TYPE_STRING, value?: Nullable<string>): NBTStringValue;
        static createNBTValue(type: ENbtDataType.TYPE_LIST, value?: Nullable<Array<INBTValue<any>> | NBT.ListTag>): NBTListValue;
        static createNBTValue(type: ENbtDataType.TYPE_COMPOUND, value?: Nullable<{
            [key: string]: INBTValue<any>;
        } | NBT.CompoundTag>): NBTCompoundValue;
        static createNBTValue(type: ENbtDataType, value?: any): Nullable<INBTValue<any>>;
        /**
         * Get NBT value of specified key as Scriptable NBT data
         * @param compoundTag source compound tag
         * @param key the specified key
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        static getCompoundTagValue(compoundTag: NBT.CompoundTag, key: string): Nullable<INBTValue<any>>;
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param listTag source list tag
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        static getListTagValue(listTag: NBT.ListTag, index: number): Nullable<INBTValue<any>>;
        /**
         * Get NBT of specified keys and indexes
         * @param tag source compound tag or list tag
         * @param args the specified keys and indexes
         * @returns a reference to the compound tag or list tag
         */
        static getTag(tag: NBT.CompoundTag | NBT.ListTag, ...args: Array<string | number>): Nullable<NBT.CompoundTag | NBT.ListTag>;
        /**
         * Get NBT value of specified keys and indexes as Scriptable NBT data
         * @param tag source compound tag or list tag
         * @param args the specified keys and indexes. Should not be empty.
         * @returns Scriptable NBT data if specified index exists in list tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        static getTagValue(tag: NBT.CompoundTag | NBT.ListTag, ...args: Array<string | number>): Nullable<INBTValue<any>>;
        /**
         * Set NBT value of specified keys and indexes by Scriptable NBT data
         * @param tag source compound tag or list tag
         * @param value Scriptable NBT data
         * @param args the specified keys and indexes. Should not be empty.
         */
        static setTagValue(tag: NBT.CompoundTag | NBT.ListTag, value: INBTValue<any>, ...args: Array<string | number>): void;
        /**
         * Parse the [[JsonListTag]] or [[JsonCompoundTag]] into Scriptable NBT data
         * @param json [[JsonListTag]] or [[JsonCompoundTag]]
         */
        static parseJson(json: JsonListTag): Nullable<NBTListValue>;
        static parseJson(json: JsonCompoundTag): Nullable<NBTCompoundValue>;
        /**
         * Get the [[JsonListTag]] or [[JsonCompoundTag]] of Scriptable NBT data
         * @param value Scriptable NBT data. Should be [[NBTListValue]] or [[NBTCompoundValue]].
         */
        static toJson(value: NBTListValue): JsonListTag;
        static toJson(value: NBTCompoundValue): JsonCompoundTag;
    }
}
