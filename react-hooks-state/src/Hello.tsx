import { useStateContext } from "./store/context";

function Hello() {
  const { dispatch, actions } = useStateContext();
  
  const handleClick = () => {
    dispatch(actions.update({ foo: Date.now() }))
  }

  return (
    <div onClick={handleClick}>Hello</div>
  );
}

export default Hello;