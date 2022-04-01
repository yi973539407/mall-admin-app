// 用来写权限名称
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    }, {
      name: 'ProductList',
    }, {
      name: 'ProductAdd',
    }, {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    }, {
      name: 'ProductList',
    }, {
      name: 'ProductAdd',
    }, {
      name: 'Category',
    }, {
      name: 'ProductEdit',
    },
  ],
};

export default function getMenuRouter(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.chlidren = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
