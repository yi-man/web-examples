import {getBookApi, IBook} from '../api'
import {Rule} from 'antd/lib/form'


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

export class Book {
  id: number;
  action: string;
  billNo: string;
  bookType: string;
  bu: string;
  buCode: string;
  le: string;
  department: number;
  departmentStr: string;
  fundAttr: string;
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
  leCode: string;

  constructor(book?: IBook) {
    this.id = book?.id || -1
    this.action= book?.action || ''
    this.billNo= book?.billNo || ''
    this.bookType= book?.bookType || ''
    this.bu= book?.bu || ''
    this.buCode= book?.buCode || ''
    this.le= book?.le || ''
    this.leCode = book?.leCode || ''
    this.department= book?.department || -1
    this.departmentStr= book?.departmentStr || ''
    this.paymentSerialNo= book?.paymentSerialNo || ''
    this.city= book?.city || -1
    this.cityStr= book?.cityStr || ''
    this.type= book?.type || -1
    this.typeStr= book?.typeStr || ''
    this.fundAttr = book?.fundAttr || ''
    this.sum= book?.sum || -1
    this.realSum= book?.realSum || -1
    this.status= book?.status || ''
    this.statusStr= book?.statusStr || ''
    this.validateTime= book?.validateTime || new Date().getTime()
    this.fundNo= book?.fundNo || ''
    this.updater= book?.updater || ''
    this.updateTime= book?.updateTime || new Date().getTime()
    this.batchNo= book?.batchNo || ''
  }

  editable(key: keyof IBook) {
    return [
      // ?????????????????????
      { tType: 'add', tAction: '0',                                                            buCode: 1, leCode: 1, fundAttr: 1, cityCode:1, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 0, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 1 },
      // ?????????????????????
      { tType: 'add', tAction: '4',                                                            buCode: 1, leCode: 1, fundAttr: 1, cityCode:1, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 1 },
      // ?????????
      { tType: 'append', tAction: '0',                                                         buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 0, contractAmount: 1},
      // (??????)?????????
      { tType: 'edit', tAction: '0', tState: ['TO_COMMIT', 'REPROVE'], hasLinkedNo: true,        buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 0, contractAmount: 1},
      // ????????? ?????????
      { tType: 'audit', tState: ['TO_PROVE'] ,                                                 buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 1, fundAcct: 0, bizCity: 0, contractAmount: 0 },
      //????????? ????????????????????????
      { tType: 'audit', tState: ['PROVED_RECONCILE', 'PROVED_NO_RECONCILE', 'RECONCILE_FAIL'], buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 0, contractAmount: 0 },
      //????????? ????????????????????????
      { tType: 'audit', tState: ['REPROVE', 'RECONCILE_OK'] ,                                  buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 0, contractAmount: 0 },
      // ??????--?????????
      { tType: ['addSub', 'edit'], tAction: '1', tActionSub: '1',                                        buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // ?????????--?????????????????????
      { tType: ['addSub', 'edit'], tAction: '1', tFundAttr: ['-1'],                                       buCode: 0, leCode: 0, fundAttr: 1, cityCode:0, action: 0, appointDate: 0, appointAmount: 1, contractNo: 0, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // ??????--?????????
      { tType: ['addSub', 'edit'], tAction: '1',                                                         buCode: 0, leCode: 0, fundAttr: 1, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // ?????????
      { tType: ['addSub', 'edit'], tAction: '2',                                                         buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // ?????????
      { tType: ['addSub', 'edit'], tAction: '3',                                                         buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 0 },


      // ????????? ?????????????????????
      { tType: 'edit', tState: ['TO_COMMIT', 'REPROVE'] ,                                      buCode: 1, leCode: 1, fundAttr: 1, cityCode:1, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 1 },
      // ????????? ????????????
      { tType: 'edit', tState: ['TO_PROVE', 'INVALID', 'PROVED_RECONCILE', 'PROVED_NO_RECONCILE', 'RECONCILE_OK', 'RECONCILE_FAIL', 'BOOKED'] ,                                      buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 0, contractAmount: 0 },

    ]
  }

  getProperties(){
    return {
      id: new Property({
        name: 'id',
        label: '??????',
        value: this.id
      }),
  
      action: new Property({
        name: 'action',
        label: '??????',
        value: this.action
      }),
  
      bu: new Property({
        name: 'action',
        label: '??????',
        value: this.action
      }),

      contractAmount: new Property({
        name: 'action',
        label: '??????',
        value: this.action,
        // rules:  {
        //   required: isRequiredAsync(context, 'contractAmount'), message: '??????'
        // },
        // {
        //   validator:(rule, value, callback)=>{
        //     if(value > 1000000000000 || value < -1000000000000){
        //       callback('????????????12???');
        //     }else{
        //       callback();
        //     }
        //   }
        // }
      // }
      })
    }}

    // if(page.isAdd || (page.isGatherEdit && data.parentBookNo ==='')){
    //   return {
    //     required: true,
    //     pattern: /^(?!0$|0\.00|0\.0|0\d+$)([0-9,][0-9,]*)+(\.[0-9]{1,2})?$/,
    //     message: '????????????????????????????????????????????????????????????????????????'
    //   };
    // } else if (page.isAppend &&  data.parentBookNo !==''){
    //   return {
    //     required: true,
    //     pattern: /^([0-9,][0-9,]*)+(\.[0-9]{1,2})?$/,
    //     message: '?????????????????????????????????????????????????????????'
    //   };
    // } else if(page.isCutOrRefundEdit){
    //   return {
    //     required: true,
    //     pattern: /^-[0-9,][0-9,]*\.{0,1}\d{0,2}$/,
    //     message: '?????????????????????????????????'      
    //   };
    // }
  // }

  /**
   * @constant {busMap}
   * ?????????2700
   * ???????????????4800
   * ?????????????????????6400
   * ?????????????????????6300
   * ???????????????2800
   * ???????????????1101
   * ???????????????1102
   * ???????????????3100
   * CHO??????4400
   */
  getBuType() {
    return {
      isDeyou: this.buCode === '2700',
      isFitment: this.buCode === '4800',
      isKeSouth: this.buCode === '6400',
      isKeNorth: this.buCode === '6300',
      isBaiChuan: this.buCode === '2800',
      isNormalRent: this.buCode === '1101',
      isUsedDeal: this.buCode === '1102',
      isRent: this.buCode === '3100',
      isCho: this.buCode === '4400'
    }
  }



  /**
   * @constant {fundAttrMap}  ????????????
   * '': -2     ??????
   * ?????????-1
   * ??????????????????0
   * ??????????????????1
   * ????????????2
   * ????????????4
   * ????????????5
   * ????????????6
   * ????????????7
   * ?????????????????????8
   */
  getFundType() {
    return {
      isDefault: this.fundAttr === '-2',
      isIncome: this.fundAttr === '-1',
      isQuality: this.fundAttr === '0',
      isBrand: this.fundAttr === '1',
      isIntention: this.fundAttr === '2',
      isSubsidy: this.fundAttr === '4',
      isStart: this.fundAttr === '5',
      isInvite: this.fundAttr === '6',
      isMaterial: this.fundAttr === '7',
      isFuse: this.fundAttr === '8'
      }
  }
   
  //?????? ????????? ??? ?????? ??????????????????  ??????????????????????????????
  hasIncome(){
    const buType = this.getBuType()
    const fundType = this.getFundType()

    return  (buType.isDeyou && fundType.isStart) 
    || ((buType.isKeSouth || buType.isKeNorth) 
    && fundType.isFuse)|| fundType.isIncome;
  }

  /**
   * @constant {statusMap}
   * ????????????TO_COMMIT
   * ????????????TO_PROVE
   * ????????????INVALID
   * ???????????????REPROVE
   * ??????????????????PROVED_RECONCILE
   * ??????????????????PROVED_NO_RECONCILE
   * ???????????????RECONCILE_OK
   * ???????????????RECONCILE_FAIL
   */
  getStatus(){
    const {status} =this;
    return {
      isToCommit: status === 'TO_COMMIT',
      isToProve: status === 'TO_PROVE',
      isInvalid: status === 'INVALID',
      isReprove: status === 'REPROVE',
      isProvedReconcile: status === 'PROVED_RECONCILE',
      isProvedNoReconcile: status === 'PROVED_NO_RECONCILE',
      isReconcileOk: status === 'RECONCILE_OK',
      isReconcileFail: status === 'RECONCILE_FAIL'
    }
  }

  /**
   * @constant {actionMap}
   * ?????????0
   * ?????????1
   * ?????????2
   * ?????????3
   * ????????????1 || 2 || 3
   * ?????????4
   */
  getActionType() {
    const {action} =this
    return {
      isGather: action === '0',
      isTransfer: action === '1',
      isCut: action === '2',
      isRefund: action === '3',
      isTCR: action === '1' || action === '2' || action === '3',
      isBegin: action === '4'
    }
  }

  /**
    * @constant {lesMap}
    * ???????????????1009
    * ???????????????5047
    * ???????????????1079
    * ???????????????5043
    * ???????????????5132
    * ???????????????1068
    */
  getLeType(){
    const {leCode} = this

    return {
     isShLianjia: leCode === '1009',
     isTjHaibei: leCode === '5047',
     isKe: leCode === '1079',
     isNjKe: leCode === '5043',
     isTzKe: leCode === '5132',
     isTjDeyou: leCode === '1068'
   };
  }


  
}

export const getBook = async () => {
  return getBookApi().then((d) => new Book(d as IBook))
}