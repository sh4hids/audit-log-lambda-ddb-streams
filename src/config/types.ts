export type LogType = 'CREATE' | 'UPDATE';

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
}

export interface FormDataInterface {
  id: string;
  field1?: string;
  field2?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogInterface {
  logType: LogType;
  oldValue: FormDataInterface | null;
  newValue: FormDataInterface;
  createdBy: UserInterface;
  createdAt?: string;
  updatedAt?: string;
}
