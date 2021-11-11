import * as React from "react"
import Svg, { Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: animate */

const Loader = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "0 0",
      }}
      width={200}
      height={200}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="flex"
      {...props}
    >
      <Circle
        cx={50}
        cy={50}
        r={0}
        fill="none"
        stroke="#fed74b"
        strokeWidth={2}
      ></Circle>
      <Circle
        cx={50}
        cy={50}
        r={0}
        fill="none"
        stroke="#00a89b"
        strokeWidth={2}
      ></Circle>
    </Svg>
  )
}

export default Loader
