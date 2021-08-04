/**
 * 全局校验类
 * 1.使用文档：
 * 
 * 
 1.formConfig的formData中：
             regx: $OMS2.Rule.a1,
 2.formConfig的ruleValidate中：
 3.
 * 
 */
const RuleList = {
  a1: {
    val: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
    desc: '两位小数（非负）',
  },
  a2: {
    val: /^-?\d*\.{0,1}\d{0,2}$/,
    desc: '两位小数（可负）',
  },
  a3: {
    val: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_]+)$/,
    desc: '数字字母下划线中文',
  },
  a4: {
    val: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_@#$%^&*+=-><~“”‘’。.，,：；/、\\`\|!！……\(\)\（\）《》?？·]+)$/,
    desc: '禁止英文的单双引号',
  },
}
class BurgeonValidate {
  static target;
  constructor() { }
  /* ------------ 正则 start ------------- */
  static get All() {
    return RuleList
  }
  static get a1() {
    return RuleList.a1.val
  }
  static get a2() {
    return RuleList.a2.val
  }
  /* ------------ 正则 end ------------- */
  // 电话号码校验
  static validatePhoneNumber(rule, value, callback) {
    const pNumver = value;
    if (!pNumver) {
      // return callback(new Error($i18n.t('modalTips.fa'))); // '手机号不能为空!'
      return callback(new Error(' ')); // '手机号不能为空!'
    }
    if (
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        pNumver
      )
    ) {
      return callback();
    }
    // return callback(new Error($i18n.t('modalTips.fb'))); // '手机号格式不正确!'
    return callback(new Error(' ')); // '手机号格式不正确!'
  };
  // 收货人地址校验：不能为纯数字
  static validateReceiveAddress(rule, value, callback) {
    const rAddress = value;
    console.log('rAddress', rAddress);
    if (!rAddress) {
      return callback(new Error($i18n.t('modalTips.fc'))); // '收货人地址不能为空!'
    }
    if (/^[^\d#\$\*\+@!%\^&-=]{1,}/.test(rAddress)) {
      return callback();
    }
    return callback(new Error($i18n.t('modalTips.fd'))); // '收货人地址格式不正确!'
  };

  // 非空验证方法
  static isEmpty(masterTable) {
    let promptMessage = ''; // 非空提示信息
    if (
      masterTable.RECEIVER_ADDRESS &&
      !/^[^\d#\$\*\+@!%\^&-=]{1,}/.test(masterTable.RECEIVER_ADDRESS)
    ) {
      promptMessage += `${$i18n.t('modalTips.fd')}`;
    }
    BurgeonValidate.target.formConfig.formData.forEach((item) => {
      // 下单店铺
      if (
        item.itemdata &&
        item.itemdata.name === $i18n.t('form_label.orderShop') &&
        !item.itemdata.pid
      ) {
        promptMessage += `${$i18n.t('form_label.orderShop')},`;
      }
    });
    if (masterTable.SHIP_AMT === '') {
      promptMessage += `${$i18n.t('form_label.distribution_costs')},`; // 配送费用
    }
    if (!masterTable.SOURCE_CODE) {
      promptMessage += `${$i18n.t('form_label.platform_billNo')},`; // 平台单号
    }
    if (!masterTable.PAY_TYPE) {
      promptMessage += `${$i18n.t('form_label.paymentMethod')},`; // 付款方式
    }
    if (masterTable.PAY_TYPE == 2) {
      if (masterTable.COD_AMT !== 0) {
        if (!masterTable.COD_AMT || masterTable.COD_AMT === '') {
          promptMessage += `${$i18n.t(
            'form_label.collection_amount'
          )},`; // 代收金额
        }
      }
    }
    if (!masterTable.RECEIVER_NAME) {
      promptMessage += $i18n.t('form_label.consignee'); // 收货人
    }
    if (!masterTable.RECEIVER_MOBILE && !masterTable.RECEIVER_PHONE) {
      promptMessage += `${$i18n.t('form_label.consignee_phone')},`; // 收货人手机
    }
    BurgeonValidate.target.formConfig1.formData.forEach((item) => {
      // 收货人省份 收货人市 收货人地址
      if (
        item.itemdata &&
        item.itemdata.name ===
        $i18n.t('form_label.consignee_province') &&
        !item.itemdata.pid
      ) {
        promptMessage += `${$i18n.t('form_label.consignee_province')},`;
      } else if (
        item.itemdata &&
        item.itemdata.name === $i18n.t('form_label.consignee_city') &&
        !item.itemdata.pid
      ) {
        promptMessage += `${$i18n.t('form_label.consignee_city')},`;
      }
    });
    if (!masterTable.RECEIVER_ADDRESS) {
      promptMessage += `${$i18n.t('form_label.aconsignee_address')},`;
    }
    if (promptMessage) {
      BurgeonValidate.target.$Message.warning(
        `${promptMessage}${$i18n.t('modalTips.y1')}`
      );
      return false;
    }
    if (Number.isNaN(masterTable.RECEIVER_MOBILE)) {
      BurgeonValidate.target.$Message.warning($i18n.t('modalTips.ey'));
    } else if (masterTable.RECEIVER_MOBILE.length !== 11) {
      BurgeonValidate.target.$Message.warning('modalTips.ez');
    } else {
      return true;
    }
  }

  // 判断使用正则
  static determineTheRegular(val) {
    let regx = '';
    switch (val) {
      case 'ORDER_AMT': // 订单金额
        regx = /^[1-9][0-9]{0,}$/;
        break;
      case 'QTY_ALL': // 商品数量
        regx = /^[1-9][0-9]{0,}$/;
        break;
      default:
        regx = '';
    }
    return regx;
  }
}


export default BurgeonValidate;
