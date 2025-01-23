export interface ColumnConfig<SelectOptions = unknown> {
	key: string;
	label: string;
	editable: boolean;
	type: 'text' | 'number' | 'email' | 'select' | 'autocomplete-select';
	options?: SelectOptions[]; // Para los tipos 'select' y 'autocomplete-select'
}

export interface TableConfig {
	columns: ColumnConfig[];
	primaryField: string;
}

export interface RowData<T> {
	[key: string]: T | unknown;
}
