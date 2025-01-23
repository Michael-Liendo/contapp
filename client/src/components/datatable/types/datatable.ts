export interface IOption {
	id: string;
	value: string;
}

export interface ColumnConfig {
	key: string;
	label: string;
	editable: boolean;
	type: 'text' | 'number' | 'email' | 'select' | 'autocomplete-select';
	options?: IOption[]; // Para los tipos 'select' y 'autocomplete-select'
}

export interface TableConfig {
	columns: ColumnConfig[];
	primaryField: string;
}

export interface RowData<T> {
	[key: string]: T | unknown;
}
