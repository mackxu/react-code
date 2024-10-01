import { useImmer } from 'use-immer';
import useProduct from './useProduct';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function App() {
  // const [
  //   products,
  //   setProducts
  // ] = useImmer(initialProducts);

  const [
    products,
    setProducts,
  ] = useProduct(initialProducts);

  function handleIncreaseClick(productId) {
    setProducts((draft) => {
      const product = draft.find(p => p.id === productId);
      product.count += 1;
    })
  }

  const handleDecreaseClick = (productId) => {
    setProducts((draft) => {
      const product = draft.find(p => p.id === productId);
      product.count -= 1;
    })
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button onClick={() => handleDecreaseClick(product.id)}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
