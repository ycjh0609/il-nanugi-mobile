import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import commonStyle from '../../styles/commonStyle';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26 
 * Edit By     : kwak ji hoon 
 * Description : Common Button
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const DEFAULT_SIZE = 35;
const DEFAULT_BACKGROUND_COLOR = "#0c5063";
const DEFAULT_INNER_COLOR = "#f2fafa";
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const CommonBtn = ({ style, btnStyle, iconStyle, titleStyle, onPress }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    const [btnWrapperConstant, setBtnWrapperConstant] = useState(0);

    const [btnBackgroundColor, setBtnBackgroundColor] = useState(DEFAULT_BACKGROUND_COLOR);
    const [btnSize, setBtnSize] = useState(DEFAULT_SIZE);

    const [iconName, setIconName] = useState(null);
    const [iconColor, setIconColor] = useState(DEFAULT_INNER_COLOR);

    const [titleName, setTitleName] = useState(null);
    const [subTitleName, setSubTitleName] = useState(null);
    const [titleColor, setTitleColor] = useState(DEFAULT_INNER_COLOR);


    /***************************
     * 버튼 스타일 제어 hook
     * Wrapper 타입에 따라 버튼 모양 변경
    ***************************/
    useEffect(function handleBtnStyle() {
        if (btnStyle && btnStyle.btnBackgroundColor) setBtnBackgroundColor(btnStyle.btnBackgroundColor);
        if (btnStyle && btnStyle.btnSize) setBtnSize(btnStyle.btnSize);
        if (btnStyle) {
            if (!btnStyle.type) btnStyle.type = 0;
            if (btnStyle.type === 0) { //circle
                setBtnWrapperConstant (2);
            }else if(btnStyle.type === 1) { //모서리가 부드러운 버튼
                setBtnWrapperConstant (0.3);
            }else{
                new Error("그런 타입 없다.")
            }
        }

    }, [btnStyle]);

    /***************************
     * 버튼 Icon 제어 hook
    ***************************/
    useEffect(function handleIconStyle() {
        if (iconStyle && iconStyle.name) { setIconName(iconStyle.name) }
        else { setIconName(null); return; };
        if (iconStyle && iconStyle.color) setIconColor(iconStyle.color);

    }, [iconStyle])

    /***************************
     * 버튼 Text 제어 hook
    ***************************/
    useEffect(function handleTextStyle() {

        if (titleStyle && titleStyle.name) { setTitleName(titleStyle.name) }
        else { setTitleName(null); return; };
        if (titleStyle && titleStyle.subName) { setSubTitleName(titleStyle.subName) }
        else { setSubTitleName(null); return; };
        if (titleStyle && titleStyle.color) setTitleColor(titleStyle.color);

    }, [titleStyle])

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={{
                ...styles.btnContainer,
                ...style,
                borderRadius: btnSize * btnWrapperConstant,
                width: btnSize,
                height: btnSize,
                backgroundColor: btnBackgroundColor,
            }}>
                {iconName !== null &&
                    <Icon name={iconName} style={{ color: iconColor }} size={btnSize * 0.6} />
                }
                {titleName !== null &&
                    <View styles={commonStyle.columnCenterAlignment}>
                        <Text style={{ color: titleColor, textAlign: "center", fontSize: (btnSize * 0.40) }} >{titleName}</Text>
                        {subTitleName !== null &&
                            <Text style={{ color: titleColor, textAlign: "center", fontSize: (btnSize * 0.25) }} >{subTitleName}</Text>
                        }
                    </View>
                }

            </View>
        </TouchableOpacity>
    )
}
export default CommonBtn;