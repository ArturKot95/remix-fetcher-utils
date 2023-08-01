export type UseGlobalVarArgs<ValueType = any> = [
  valueKey: string,
  options?: {
    defaultValue: ValueType;
  }
];
