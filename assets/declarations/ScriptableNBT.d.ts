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
         * Set the Scriptable NBT data.
         * With automatic check type and range.
         */
        set value(value: Nullable<T>);
        /**
         * Set the Scriptable NBT data from compound tag
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
         * Set the Scriptable NBT data from list tag
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
        get value(): Nullable<Array<INBTValue<any>>>;
        set value(value: Nullable<Array<INBTValue<any>> | NBT.ListTag>);
        /**
         * Get the Scriptable NBT data as [[NBT.ListTag]]
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
        get value(): Nullable<{
            [key: string]: INBTValue<any>;
        }>;
        set value(value: Nullable<{
            [key: string]: INBTValue<any>;
        } | NBT.CompoundTag>);
        /**
         * Get the Scriptable NBT data as [[NBT.CompoundTag]]
         */
        get compoundTag(): Nullable<NBT.CompoundTag>;
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
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.
         */
        static getCompoundTagValue(compoundTag: NBT.CompoundTag, key: string): Nullable<INBTValue<any>>;
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param listTag source list tag
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.
         */
        static getListTagValue(listTag: NBT.ListTag, index: number): Nullable<INBTValue<any>>;
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
