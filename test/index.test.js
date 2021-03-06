import sumVectors from '../src/sum-vectors';
import { AsyncArray } from '../src/async-array';

test('Сложение векторов происходит правильно.', async () => {
  const v1 = new AsyncArray([1, 2, 3]);
  const v2 = new AsyncArray([3, 4, 5]);
  const callback = jest.fn((x) => x);
  await sumVectors(v1, v2, callback);

  return expect(callback.mock.calls[0][0].getArrayForTests()).toMatchObject([4, 6, 8]);
});

test('Векторы не соразмерны; ошибка.', async () => {
  const v1 = new AsyncArray([1, 2, 3]);
  const v2 = new AsyncArray([3, 4, 5, 6]);

  return expect(sumVectors(v1, v2)).rejects.toEqual(new Error('Векторы несоразмерны'));
});

test('Векторы не соприкасаются; ошибка.', async () => {
  const v1 = new AsyncArray([1, 2, 3]);
  const v2 = new AsyncArray([4, 5, 6]);

  return expect(sumVectors(v1, v2)).rejects.toEqual(new Error('Векторы не соприкасаются'));
});
