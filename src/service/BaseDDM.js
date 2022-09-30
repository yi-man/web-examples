/*
  eslint-disable class-methods-use-this
*/
/**
 * @param type  值类型
 * @param formType 表单类型
 */

import moment from 'moment';
import { AttachParser } from '@/utils/parser';
import Enum from './types/Enum';

/**
 * TODO: model 可能和 record 关联     record传进来时，比较有无变化，如变化，更新模型
 */
export default class DdmBase {
  constructor(model) {
    // 初始的model
    this.primitiveModel = model;
    // 运算之后的model
    this.model = model;
    // model是否有效
    this.isModelEffective = false;
    this.record = {};

    // 补丁和全局补丁
    this.patch = {};
    this.gPatch = {};
  }

  getModel(record) {
    // 是否会导致内存泄露
    if (this.record !== record) {
      if (typeof this.model === 'function') {
        this.model = this.primitiveModel(record);
      }
      this.record = record;
    }

    if (!this.isModelEffective) {
      this.isModelEffective = true;
    }

    return this.model;
  }

  select() {}

  update(patch) {
    this.patch = patch;
    return this;
  }

  updateAll(gPatch) {
    this.gPatch = gPatch;
    return this;
  }

  clearPatches() {
    this.patch = {};
    this.gPatch = {};
  }

  // 只允许消费一次
  getPatches() {
    const { patch, gPatch } = this;

    this.clearPatches();

    return {
      patch,
      gPatch,
    };
  }

  add() {}

  remove() {}

  renderTotable() {}

  renderToSearchForm() {}

  renderToForm(record) {
    const model = this.getModel(record);
    const { patch, gPatch } = this.getPatches();

    const fields = Object.keys(model).map((key) => {
      const item = model[key];
      const {
        render, formType: type, type: literalType, ...others
      } = item;

      // type, literalType 不允许通过配置的方式变更， render可追加
      let newItem = {
        key,
        type,
        ...others,
        ...gPatch,
      };

      if (patch[key]) {
        newItem = {
          ...newItem,
          ...patch[key],
        };
      }

      const {
        render: appendAdd, mappings,
      } = newItem;

      let combineRender = appendAdd || render;

      // 初始值赋值
      const v = record[key];

      // initialvalue 的处理
      let initialValue;

      // render > 当前值 > initialvalue
      switch (type) {
        case 'checkbox':
          if (v && v.length > 0) {
            initialValue = v;
          } else if (literalType instanceof Enum) {
            initialValue = literalType.getIntitailValue();
          } else {
            // eslint-disable-next-line
            initialValue = newItem.initialValue;
          }
          break;
        case 'datePicker':
          if (v !== 0) {
            initialValue = moment(v);
          } else {
            initialValue = moment(newItem.initialValue);
          }
          break;
        case 'upload':
          initialValue = AttachParser.toFileList(v);
          break;
        case 'radio':
          if (v !== -1) {
            initialValue = v;
          }
          break;
        case 'search':
        case 'sug':
          initialValue = v || newItem.initialValue;
          // 自定义render > 默认render
          if (!combineRender && mappings) {
            combineRender = (v2, r) => (v2 ? `${r[mappings.code]}/${r[mappings.desc]}` : undefined);
          }
          break;
        case 'select':
          // 使用Enum类型时
          if (literalType instanceof Enum) {
            initialValue = v || literalType.getIntitailValue();
          } else { // 使用原始select时
            initialValue = v || newItem.initialValue;
          }
          break;
        default:
          // 优先 v 值， 无v值， 使用 initialValue, 未定义返回 undefined
          initialValue = v || newItem.initialValue;
      }

      newItem.initialValue = combineRender ? combineRender(v, record) : initialValue;


      if (literalType instanceof Enum) {
        newItem.options = literalType.getOptions();
      }

      return newItem;
    });

    const beforeSubmit = this.beforeSubmit(model);

    return {
      fields,
      beforeSubmit,
    };
  }


  beforeSubmit = model => (params) => {
    const ret = {};

    Object.keys(params).forEach((k) => {
      const param = params[k];
      if (param || param === 0) {
        const conf = model[k];

        if (conf) {
          const { type, formType, mappings = {} } = conf;

          switch (formType) {
            case 'dateRange':
              ret[mappings.start || 'startDate'] = param[0] ? param[0].format('YYYY-MM-DD') : undefined;
              ret[mappings.end || 'endDate'] = param[1] ? param[1].format('YYYY-MM-DD') : undefined;
              break;
            case 'search':
            case 'sug':
              ret[k] = param.key;
              break;
            case 'upload':
              ret[k] = AttachParser.toUrlList(param);
              break;
            // datepicker 一般type为 timestamp
            case 'datePicker':
              ret[k] = param ? (new Date(param)).getTime() : undefined;
              break;
            case 'select':
              if (type instanceof Enum) {
                const keyMap = type.getKeyMap();
                if (keyMap) {
                  ret[keyMap.code] = param;
                  ret[keyMap.desc] = type.getDesc(param);
                } else {
                  ret[k] = param;
                }
              } else {
                ret[k] = param;
              }
              break;
            default:
              ret[k] = param;
          }

          if (type === 'string') {
            ret[k] = param.trim();
          } else if (type === 'timestamp') {
            ret[k] = param ? (new Date(param)).getTime() : undefined;
          }
        }
      }
    });

    return ret;
  }
}
