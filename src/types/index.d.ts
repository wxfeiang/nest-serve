import 'express';

import { Employee } from '../employee/entities/employee.entity';

declare namespace NodeJS {
  interface ProcessEnv {
    RUNNING: string;
  }
}

export type TIdAndUsername = 'id' | 'username';
export interface PageList {
  currentPage: number
  pageSize: number
}
declare module 'express' {
  interface Request {
    user: Pick<Employee, TIdAndUsername>;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RUNNING: string;
      id: Employee['id'];
      DATA_SHOW_CODE: boolean
    }
  }
}
