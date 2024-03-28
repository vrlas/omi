// 数据处理

/**
 * 扁平树结构
 */
export const flatArray = arr => {
  const result = [];
  arr.forEach(item => {
    const {children, ...rest} = item;
    result.push({ ...rest });
    if (children) result.push(...flatArray(children))
  })
  return result;
}