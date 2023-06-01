/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 15:18:35
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-28 16:31:20
 * @FilePath: /v3ts-lockin/src/utils/helper/treeHelper.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  // 获取树结构配置
  config: Partial<TreeHelperConfig> = {},
): T[] {
  // 获取配置
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node) => ({ ...node })) // 拷贝一次
      .filter((node) => {
        // 对含有children的选项递归调用listFilter
        node[children] = node[children] && listFilter(node[children]);
        // 执行传入的回调 func 进行过滤
        return func(node) || (node[children] && node[children].length);
      });
  }

  // 返回一个经过过滤的数组
  return listFilter(tree);
}

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T | T[] | null {
  config = getConfig(config);
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      // ?
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

// 提取树指定结构
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach<T>(item, opt));
}

// 提取树指定结构
export function treeMapEach<T = any>(
  data: T,
  { children = 'children', conversion }: { children?: string; conversion: Fn },
): T {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) => treeMapEach(i, { children, conversion })),
    };
  } else {
    return {
      ...conversionData,
    };
  }
}
