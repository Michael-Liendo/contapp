export interface ColumnConfig {
	key: string
	label: string
	editable: boolean
	type: "text" | "number" | "email" | "select" | "autocomplete-select"
	options?: any[] // Para los tipos 'select' y 'autocomplete-select'
  }
  
  export interface TableConfig {
	columns: ColumnConfig[]
	primaryField: string
  }
  
  export interface RowData {
	[key: string]: string | number
  }
  
  