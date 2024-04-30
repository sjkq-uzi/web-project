export const data = [
  {
    id: "account",
    name: "用户账号",
    isDisabled: true, //input是否禁用
    modelInfo: "", //input绑定的值
    hasButton: false, //是否有按钮
    hasInput: true, //是否有输入框
    buttonText: "", //按钮文字
    hasSelect: false,
 
  },
  {
    id: "Password",
    name: "用户密码",
    isDisabled: false,
    modelInfo: "",
    hasButton: true,
    hasInput: false,
    buttonText: "修改密码",
    hasSelect: false,
  },
  {
    id: "name",
    name: "用户姓名",
    isDisabled: false,
    modelInfo: "",
    hasButton: true,
    hasInput: true,
    buttonText: "保存",
    hasSelect: false,
  },
  {
    id: "gender",
    name: "用户性别",
    isDisabled: false,
    modelInfo: "男",
    hasButton: true,
    hasInput: false,
    buttonText: "保存",
    special: {
      gender: "男",
    },
    hasSelect: true,
  },
  {
    id: "identity",
    name: "用户身份",
    isDisabled: true,
    modelInfo: "",
    hasButton: false,
    hasInput: true,
    buttonText: "",
    hasSelect: false,
 
  },
  {
    id: "department",
    name: "用户部门",
    isDisabled: true,
    modelInfo: "",
    hasButton: false,
    hasInput: true,
    buttonText: "",
    hasSelect: false,
  
  },
  {
    id: "email",
    name: "用户邮箱",
    isDisabled: false,
    modelInfo: "",
    hasButton: true,
    hasInput: true,
    buttonText: "保存",
    hasSelect: false,
  },
];
