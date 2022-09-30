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
      // 新建（收款）页
      { tType: 'add', tAction: '0',                                                            buCode: 1, leCode: 1, fundAttr: 1, cityCode:1, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 0, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 1 },
      // 新建（期初）页
      { tType: 'add', tAction: '4',                                                            buCode: 1, leCode: 1, fundAttr: 1, cityCode:1, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 1 },
      // 追加页
      { tType: 'append', tAction: '0',                                                         buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 0, contractAmount: 1},
      // (编辑)追加页
      { tType: 'edit', tAction: '0', tState: ['TO_COMMIT', 'REPROVE'], hasLinkedNo: true,        buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 0, contractAmount: 1},
      // 审核页 待审核
      { tType: 'audit', tState: ['TO_PROVE'] ,                                                 buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 1, fundAcct: 0, bizCity: 0, contractAmount: 0 },
      //审核页 已审核、对账失败
      { tType: 'audit', tState: ['PROVED_RECONCILE', 'PROVED_NO_RECONCILE', 'RECONCILE_FAIL'], buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 0, contractAmount: 0 },
      //审核页 反审核、对账成功
      { tType: 'audit', tState: ['REPROVE', 'RECONCILE_OK'] ,                                  buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 0, contractAmount: 0 },
      // 转款--转出页
      { tType: ['addSub', 'edit'], tAction: '1', tActionSub: '1',                                        buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // 转款页--资金性质是收入
      { tType: ['addSub', 'edit'], tAction: '1', tFundAttr: ['-1'],                                       buCode: 0, leCode: 0, fundAttr: 1, cityCode:0, action: 0, appointDate: 0, appointAmount: 1, contractNo: 0, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // 转款--转入页
      { tType: ['addSub', 'edit'], tAction: '1',                                                         buCode: 0, leCode: 0, fundAttr: 1, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // 扣款页
      { tType: ['addSub', 'edit'], tAction: '2',                                                         buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 1, contractAmount: 0 },
      // 退款页
      { tType: ['addSub', 'edit'], tAction: '3',                                                         buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 0, merchantOrderNo: 0, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 0 },


      // 编辑页 待提交，反审核
      { tType: 'edit', tState: ['TO_COMMIT', 'REPROVE'] ,                                      buCode: 1, leCode: 1, fundAttr: 1, cityCode:1, action: 0, appointDate: 1, appointAmount: 1, contractNo: 1, agreementNo: 1, supplierNo: 1, taxpayerType: 1, brand: 1, merchant: 1, merchantAccount: 1, paymentTime: 1, merchantId: 1, merchantOrderNo: 1, remark: 1, receiptNo: 1, paymentSerialNo: 1, fundAcct: 1, bizCity: 1, contractAmount: 1 },
      // 编辑页 其余状态
      { tType: 'edit', tState: ['TO_PROVE', 'INVALID', 'PROVED_RECONCILE', 'PROVED_NO_RECONCILE', 'RECONCILE_OK', 'RECONCILE_FAIL', 'BOOKED'] ,                                      buCode: 0, leCode: 0, fundAttr: 0, cityCode:0, action: 0, appointDate: 0, appointAmount: 0, contractNo: 0, agreementNo: 0, supplierNo: 0, taxpayerType: 0, brand: 0, merchant: 0, merchantAccount: 0, paymentTime: 0, merchantId: 0, merchantOrderNo: 0, remark: 0, receiptNo: 0, paymentSerialNo: 0, fundAcct: 0, bizCity: 0, contractAmount: 0 },

    ]
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
      }),

      contractAmount: new Property({
        name: 'action',
        label: '序号',
        value: this.action,
        // rules:  {
        //   required: isRequiredAsync(context, 'contractAmount'), message: '必填'
        // },
        // {
        //   validator:(rule, value, callback)=>{
        //     if(value > 1000000000000 || value < -1000000000000){
        //       callback('最大长度12位');
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
    //     message: '合同金额目前系统仅支持小数点后两位正数且不能为零'
    //   };
    // } else if (page.isAppend &&  data.parentBookNo !==''){
    //   return {
    //     required: true,
    //     pattern: /^([0-9,][0-9,]*)+(\.[0-9]{1,2})?$/,
    //     message: '合同金额目前系统仅支持小数点后两位正数'
    //   };
    // } else if(page.isCutOrRefundEdit){
    //   return {
    //     required: true,
    //     pattern: /^-[0-9,][0-9,]*\.{0,1}\d{0,2}$/,
    //     message: '仅支持小数点后两位负数'      
    //   };
    // }
  // }

  /**
   * @constant {busMap}
   * 德佑：2700
   * 装修平台：4800
   * 贝壳南区业务：6400
   * 贝壳北区业务：6300
   * 百川平台：2800
   * 普通租赁：1101
   * 二手买卖：1102
   * 租赁平台：3100
   * CHO线：4400
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
   * @constant {fundAttrMap}  资金性质
   * '': -2     默认
   * 收入：-1
   * 品质保证金：0
   * 品牌保证金：1
   * 意向金：2
   * 补贴款：4
   * 启动费：5
   * 招聘费：6
   * 物料费：7
   * 融合器服务费：8
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
   
  //德佑 启动费 和 贝壳 融合期服务费  资金性质添加收入选项
  hasIncome(){
    const buType = this.getBuType()
    const fundType = this.getFundType()

    return  (buType.isDeyou && fundType.isStart) 
    || ((buType.isKeSouth || buType.isKeNorth) 
    && fundType.isFuse)|| fundType.isIncome;
  }

  /**
   * @constant {statusMap}
   * 待提交：TO_COMMIT
   * 待审核：TO_PROVE
   * 已作废：INVALID
   * 审核拒绝：REPROVE
   * 审核待对账：PROVED_RECONCILE
   * 审核不对账：PROVED_NO_RECONCILE
   * 对账成功：RECONCILE_OK
   * 对账失败：RECONCILE_FAIL
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
   * 收款：0
   * 转款：1
   * 扣款：2
   * 退款：3
   * 转扣退：1 || 2 || 3
   * 期初：4
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
    * 上海链家：1009
    * 天津海贝：5047
    * 贝壳找房：1079
    * 南京贝壳：5043
    * 台州贝壳：5132
    * 德佑天津：1068
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