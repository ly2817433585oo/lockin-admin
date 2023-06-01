export interface MenuState {
  // 默认选中的列表
  defaultSelectedKeys: string[];
  // 缩进
  inlineIndent?: number;
  // 展开数组
  openKyes: string[];
  // 当前选中的菜单项 key 数组
  selectedKeys: string[];
  // 收缩状态下展开的数组
  collapsedOpenKeys: string[];
}
