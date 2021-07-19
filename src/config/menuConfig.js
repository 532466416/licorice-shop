import {
  DesktopOutlined,
  AppstoreFilled,
  FileTextFilled,
  TagsOutlined,
  UserOutlined,
  SkinFilled,
  FundFilled,
  BarChartOutlined,
  LineChartOutlined,
  PieChartFilled,
  OrderedListOutlined
} from '@ant-design/icons';

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: <DesktopOutlined/>, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/products',
    icon: <AppstoreFilled/>,
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: <FileTextFilled/>
      },
      {
        title: '商品管理',
        key: '/product',
        icon: <TagsOutlined/>
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined/>
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <SkinFilled/>,
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: <FundFilled/>,
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: <BarChartOutlined/>
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: <LineChartOutlined/>
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: <PieChartFilled/>
      },
    ]
  },

  {
    title: '订单管理',
    key: '/order',
    icon: <OrderedListOutlined/>,
  },
]

export default menuList