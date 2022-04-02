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