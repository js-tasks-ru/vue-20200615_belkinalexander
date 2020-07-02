const mockDate = (DateClass) => {
  function Mock(...args) {
    return args.length === 0
      ? new DateClass(Mock.now())
      : new DateClass(...args);
  }
  Object.setPrototypeOf(Mock, DateClass);
  Mock.prototype = DateClass.prototype;
  let now;
  Mock.now = () => (now === undefined ? DateClass.now() : now);
  Mock.mockNow = (value) => (now = value);
  Mock.mockRestore = () => Mock.mockNow();
  return Mock;
};
global.Date = mockDate(Date);
