import { useEffect, useRef, useState } from "react";

const dateList = ['2022-01-01', '2023-01-02', '2024-01-03'];

function Calendar({ defaultValue, onChange }: {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}) {
  const [innerValue, setInnerValue] = useState(defaultValue || new Date());
  function changeValue(date: Date) {
    setInnerValue(date);
    onChange?.(date);
  }
  return (
    <div>
      <h1>{innerValue.toLocaleDateString()}</h1>
      <ul>
        {dateList.map((item) => {
          return <li key={item} onClick={() => changeValue(new Date(item))}>{item}</li>
        })}
      </ul>
    </div>
  )
}

// 受控组件
function Calendar2({ value, onChange }: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  function changeValue(date: Date) {
    onChange?.(date);
  }
  return (
    <div>
      <h1>{value.toLocaleDateString()}</h1>
      <ul>
        {dateList.map((item) => {
          return <li key={item} onClick={() => changeValue(new Date(item))}>{item}</li>
        })}
      </ul>
    </div>
  )
}

// 组件库组件 支持2种模式
function Calendar3({ defaultValue, value, onChange }: {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}) {
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== undefined) {
      return value;
    }
    return defaultValue;
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // 根据value的变化，决定是否是受控组件
    // 如果是受控组件，就不更新内部状态
    // 如果变成非受控组件，就更新一次内部状态
    if (value === undefined) {
      setInnerValue(value);
    }
  }, [value])


  const mergeValue = value === undefined ? innerValue : value;

  function changeValue(date: Date) {
    if (value === undefined) {
      setInnerValue(date);
      return;
    }
    onChange?.(date);
  }
  return (
    <div>
      <h1>{mergeValue?.toLocaleDateString()}</h1>
      <ul>
        {dateList.map((item) => {
          return <li key={item} onClick={() => changeValue(new Date(item))}>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default function App() {
  const [value, setValue] = useState(new Date('2024-12-14'))
  return (
    <>
      {/* <Calendar defaultValue={new Date('2024-12-14')} onChange={(date) => {
        console.log(date.toLocaleDateString())
      }} /> */}
      {/* <Calendar2 value={value} onChange={setValue} /> */}
      <p>组件库组件 支持2种模式</p>
      <Calendar3 value={value} onChange={setValue} />
      <Calendar3 defaultValue={new Date('2024-12-05')} onChange={(date) => {
        console.log(date.toLocaleDateString())
      }} />
    </>
  )
}