const texts = {
  'Identifier or password invalid.': '请输入正确的用户名/密码！',
  'Invalid token.': '登录令牌已失效，请重新登录'
};

export function lan(key) {
  return texts[key] || key;
}
