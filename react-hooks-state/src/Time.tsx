import { useStateContext } from "./store/context";

export function Time() {
  const { state: { foo } } = useStateContext();
  return <div>current time: {foo}</div>
}