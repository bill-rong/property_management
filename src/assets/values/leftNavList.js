export function userMenuList() {
    return [
        {
        id: 0,
        authName: "导航一",
        icon: "el-icon-s-custom",
        children: [
            { authName: "用户与部门管理", id: 1, path: "department", parentid: 0},
            { authName: "通讯录设置", id: 2, path: "adrbook", parentid: 0 }
        ]
        },
        {
        id: 1,
        authName: "导航二",
        icon: "el-icon-s-claim",
        children: [
            { authName: "数据概览", id: 1, path: "overview", parentid: 1 },
            { authName: "员工活跃数据", id: 2, path: "employees", parentid: 1 }
        ]
        },
        {
        id: 2,
        authName: "导航三",
        icon: "el-icon-office-building",
        children: [
            { authName: "企业信息管理", id: 1, path: "information", parentid: 2 },
            { authName: "权限管理", id: 2, path: "authority", parentid: 2 },
            { authName: "团队邀请设置", id: 3, path: "team", parentid: 2 },
            { authName: "安全策略", id: 4, path: "safety", parentid: 2 },
            { authName: "管理员日志", id: 5, path: "journal", parentid: 2 }
        ]
        }
    ];
};

export function adminMenuList() {
  return [
      {
      id: 0,
      authName: "导航一",
      icon: "el-icon-s-custom",
      children: [
          { authName: "用户与部门管理", id: 1, path: "department", parentid: 0},
          { authName: "通讯录设置", id: 2, path: "adrbook", parentid: 0 }
      ]
      },
      {
      id: 1,
      authName: "导航二",
      icon: "el-icon-s-claim",
      children: [
          { authName: "数据概览", id: 1, path: "overview", parentid: 1 },
          { authName: "员工活跃数据", id: 2, path: "employees", parentid: 1 }
      ]
      }
  ];
};