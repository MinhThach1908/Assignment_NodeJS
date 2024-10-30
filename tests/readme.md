## Jest

- test(name, fn): Định nghĩa một test case. name là tên của test và fn là hàm thực hiện kiểm thử.
- expect(value): Gọi hàm để kiểm tra giá trị của value.
- toBe(expected): So sánh value với expected.

## Kiểm tra số
- toBe(value): So sánh giá trị và kiểu dữ liệu chính xác (giống ===).
- toEqual(value): So sánh giá trị sâu (đối với đối tượng).
- toBeGreaterThan(number), toBeLessThan(number): Kiểm tra số lớn hơn hoặc nhỏ hơn.

```
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

```

## Kiểm tra giá trị boolean
- toBeNull(): Kiểm tra null.
- toBeDefined(): Kiểm tra đã được định nghĩa.
- toBeFalsy(), toBeTruthy(): Kiểm tra giá trị true hoặc false.
```
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

```

## Kiểm tra chuỗi
- toMatch(regex): Kiểm tra nếu chuỗi khớp với biểu thức chính quy.

```
test('there is no "I" in team', () => {
  expect('team').not.toMatch(/I/);
});
```

## Kiểm tra mảng hoặc iterable
- toContain(item): Kiểm tra nếu phần tử nằm trong mảng.

```
test('the shopping list has milk on it', () => {
  const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];
  expect(shoppingList).toContain('milk');
});
```
## Test với async/await
```
// asyncExample.js
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('peanut butter'), 1000);
  });
};

module.exports = fetchData;

```

```
const fetchData = require('./asyncExample');

test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

```

## Test với done callback

```
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();  // Báo cho Jest biết rằng test đã hoàn thành
  }

  fetchData().then(callback);
});

```

```
const fetchData = jest.fn(() => Promise.resolve('peanut butter'));

test('fetches successfully', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
  expect(fetchData).toHaveBeenCalledTimes(1);  // Kiểm tra nếu hàm đã được gọi 1 lần
});

```