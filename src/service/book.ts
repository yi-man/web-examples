import {getBookApi} from '../api'
import {Rule} from 'antd/lib/form'

type IBook = {
  id: number;
  action: string;
  billNo: string;
  bookType: string;
  bu: string;
  buCode: string;
  le: string;
  department: number;
  departmentStr: string;
  paymentSerialNo: string;
  city: number;
  cityStr: string;
  type: number;
  typeStr: string;
  sum: number;
  realSum: number;
  status: string;
  statusStr: string;
  validateTime: number;
  fundNo: string;
  updater: string;
  updateTime: number;
  batchNo: string;
}

class Property{
  name:string = ''
  value: string = ''
  label: string
  type: string
  formType: 'input' | 'select'
  rules: Rule[]
  initialValue: number | string 

  constructor(values: {
    name: string;
    value?: string | number;
    label?: string;
    type?: string;
    formType?: 'input' | 'select';
    rules?: Rule[];
    initialValue?: number | string
  }){
    this.name = values.name;
    this.label = values.label || '';
    this.type = values.type || 'string';
    this.formType = values.formType || 'input';
    this.rules = values.rules || [];
    this.initialValue = values.initialValue || ''
  }
}

class Book {
  id: number;
  action: string;
  billNo: string;
  bookType: string;
  bu: string;
  buCode: string;
  le: string;
  department: number;
  departmentStr: string;
  paymentSerialNo: string;
  city: number;
  cityStr: string;
  type: number;
  typeStr: string;
  sum: number;
  realSum: number;
  status: string;
  statusStr: string;
  validateTime: number;
  fundNo: string;
  updater: string;
  updateTime: number;
  batchNo: string;

  constructor(book: IBook) {
    this.id = book.id
    this.action= book.action
    this.billNo= book.billNo
    this.bookType= book.bookType
    this.bu= book.bu
    this.buCode= book.buCode

    this.le= book.le
    this.department= book.department
    this.departmentStr= book.departmentStr
    this.paymentSerialNo= book.paymentSerialNo
    this.city= book.city
    this.cityStr= book.cityStr
    this.type= book.type
    this.typeStr= book.typeStr
    this.sum= book.sum
    this.realSum= book.realSum
    this.status= book.status
    this.statusStr= book.statusStr
    this.validateTime= book.validateTime
    this.fundNo= book.fundNo
    this.updater= book.updater
    this.updateTime= book.updateTime
    this.batchNo= book.batchNo
  }

  getProperties(){
    return {
      id: new Property({
        name: 'id',
        label: '序号',
        value: this.id
      }),
  
      action: new Property({
        name: 'action',
        label: '序号',
        value: this.action
      }),
  
      bu: new Property({
        name: 'action',
        label: '序号',
        value: this.action
      })
    }
  }

  isDeyou() {
    return this.bu === '2700'
  }

}

export const getBook = async () => {
  return getBookApi().then((d) => new Book(d as IBook))
}