import * as React from "react"
import Svg, { G, Circle, Text, TSpan } from "react-native-svg"

function AppLogo(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={166} height={49} {...props}>
      <G data-name="Group 2457" transform="translate(-88 -45)">
        <Circle
          data-name="Ellipse 2"
          cx={4}
          cy={4}
          r={4}
          transform="translate(245 77)"
          fill="#00a89c"
        />
        <Circle
          data-name="Ellipse 1"
          cx={20}
          cy={20}
          r={20}
          transform="translate(88 52)"
          fill="#ffd74b"
        />
        <Text
          transform="translate(99 85)"
          fill="#0e0e0e"
          fontSize={37}
          // fontFamily="SegoeUI"
        >
          <TSpan x={0} y={0}>
            {"Schedulic"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default AppLogo