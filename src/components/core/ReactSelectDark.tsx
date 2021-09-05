import * as React from "react";
import RSelect from "react-select";
import chakraColors from "../../libs/other/chakraColors";

interface PropTypes {
  onChange: (e: any) => any;
  value: object | undefined;
  options: { value: string; label: string }[];
  defaultValue?: object | undefined;
  darkTheme: boolean;
}
const ReactSelectDark = (props: PropTypes) => {
  const {
    onChange,
    value,
    options,
    defaultValue = undefined,
    darkTheme,
  } = props;
  return (
    <RSelect
      defaultValue={defaultValue}
      options={options}
      value={value}
      onChange={onChange}
      theme={
        darkTheme
          ? (theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: chakraColors.blue[200], // Selected
                primary25: chakraColors.gray[600], // Ring
                primary50: chakraColors.blue[600], // Ring
                primary75: chakraColors.blue[700], // Ring
                neutral0: chakraColors.gray[700],
                neutral5: chakraColors.gray[700],
                neutral10: chakraColors.gray[700],
                neutral20: chakraColors.gray[600],
                neutral30: chakraColors.gray[500],
                neutral40: chakraColors.white,
                neutral50: chakraColors.white,
                neutral80: chakraColors.white,
                neutral90: chakraColors.white,
              },
            })
          : undefined
      }
    />
  );
};

export default ReactSelectDark;
