export const getBookApi = async () => {
  const data = {
    // 主键
    id: 1,
    // 台账的执行动作
    action: 'transfer',
    // 台账编号
    billNo: 'billNo11',
    // 台账类型
    bookType: 'BUSINESS',
    // BU
    bu: 'lianjia',
    // LE
    le: '上海链家',
    // 事业部
    department: 2,
    // 事业部
    departmentStr: '交易部',
    // 支付流水号
    paymentSerialNo: 'No-1234',
    // 城市
    city: 23,
    // 城市
    cityStr: '上海',
    // 资金性质
    type: 2,
    // 资金性质
    typeStr: '转账',
    // 收款金额
    sum: 1000,
    // 到账金额
    realSum: 1000,
    // 状态
    status: 'done',
    // 状态
    statusStr: '已到账',
    // 对账时间
    validateTime: 1664435141,
    // 资金编号
    fundNo: 'fundNo-2222',
    // 操作人
    updater: 'xxwade',
    // 操作时间
    updateTime: 1664431141,
    // 导入批次号
    batchNo: 'batchNo-111',
  };

  return data
}