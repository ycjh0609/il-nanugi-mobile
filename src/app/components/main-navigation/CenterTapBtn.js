import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View, Animated } from "react-native";
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import commonStyle from '../../styles/commonStyle';
import CommonBtn from '../common/CommonBtn';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.29
 * Edit By     : kwak ji hoon 
 * Description : Main Bottom Tab Center Button
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    opacityContainer: {
        backgroundColor: commonStyle.backgroundColor,
        bottom: -30,
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,1)',
        opacity: 0.7
    },
    btnContainer: {
        ...commonStyle.rowAlignment,
        padding: 20
    },
    centerBtnWrapper: {
        borderColor: commonStyle.oneBackgroundColor,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1.5,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
    },
    subBtnsContainer: {
        ...commonStyle.rowAlignment,
        height: 100,
        top: -70,
        position: "absolute",
    },
    leftInnerBtn: {
        backgroundColor: commonStyle.oneBackgroundColor,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 10,
        ...commonStyle.rowAlignment
    },
    rightInnerBtn: {
        backgroundColor: commonStyle.oneBackgroundColor,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 20,
        ...commonStyle.rowAlignment
    },
    subBtnTitle: {
        fontSize: 30,
        fontWeight:"600",
        color: commonStyle.oneTextInColor
    },
    subBtnTitle2: {
        marginTop:5,
        fontSize: 16,
        color: commonStyle.oneTextInColor
    }


});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const CENTER_BTN_SIZE = 65;    // Center Button Size
const INCREASED_CONSTANT = 15; // Center Button Wrapper Size (CENTER_BTN_SIZE + INCREASED_CONSTANT)
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
function animate(target, toValue, duration, callback) {
    Animated.timing(target, {
        toValue,
        duration,
        useNativeDriver: false //뭔지 모르겠는데, 없으면 에러남
    }).start(() => {
        if (callback) callback(); //애니메이트가 끝난 후 콜백실행
    });
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const CenterTabBtn = (props) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [btnActivate, setBtnActivate] = useState(false);
    const [subBtnActivate, setSubBtnActivate] = useState(false);
    //animated values
    const wrapperBtnSize = useRef(new Animated.Value(CENTER_BTN_SIZE)).current;
    const opacityHeight = useRef(new Animated.Value(0)).current;

    const toggleBtnActivate = useCallback(() => {
        setBtnActivate(!btnActivate);
    });
    const btnCreateTask = useCallback(()=>{
        props.navigation.navigate("Home", { routeName:"CreateTaskScreen" });
        setBtnActivate(false);
    })
    useEffect(function handleAnimationAfterBtnClick() {

        if (btnActivate) {
            animate(wrapperBtnSize, CENTER_BTN_SIZE + INCREASED_CONSTANT, 200);
            animate(opacityHeight, WINDOW_HEIGHT, 200, () => {
                setSubBtnActivate(true); //버튼 Wrapper 애니메이션 종료 후 실행
            });
        } else {
            setSubBtnActivate(false);
            animate(wrapperBtnSize, CENTER_BTN_SIZE, 200);
            animate(opacityHeight, 0, 400);
        }
    }, [btnActivate]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View {...props} >
            {btnActivate &&
                <View >
                    {/* ------------------------------------------------------------------------------ 
                      * 03-2-1) Opacity Container [버튼이 클릭 되었을때 app 전체에 검정화면을 씌움]
                      *------------------------------------------------------------------------------*/}
                    <Animated.View style={{
                        left: -(WINDOW_WIDTH / 2),
                        width: WINDOW_WIDTH,
                        height: opacityHeight,
                        ...styles.opacityContainer,
                    }}>
                        <TouchableOpacity style={{ height: "100%" }} onPressIn={toggleBtnActivate}>
                        </TouchableOpacity>
                    </Animated.View>
                    {/* ------------------------------------------------------------------------------ 
                      * 03-2-2) Sub Buttons [left, right]
                      * 버튼이 클릭되고 opacity container 애니메이션이 끝나고 callback 으로 화면에 나와야함
                      *------------------------------------------------------------------------------*/}
                    {subBtnActivate &&
                        <View style={{
                            ...styles.subBtnsContainer,
                            // absolute view 를 정중아에 배치
                            // 전체너비의 절반만큼 왼쪽으로 보내버림 (센터버튼 좌측에서 시작이기에 버튼 사이즈 만큼 조정)
                            left: -(WINDOW_WIDTH / 2),
                            width: WINDOW_WIDTH
                        }}>
                            <View style={{ width: "48%" }}>
                                <TouchableOpacity
                                    style={styles.leftInnerBtn}
                                    onPress={() => btnCreateTask()} >
                                    <View style={{ flex: 1, ...commonStyle.rowCenter }}>
                                        <View style={commonStyle.columnCenterAlignment}>
                                            <Text style={styles.subBtnTitle}>1 + </Text>
                                            <Text style={styles.subBtnTitle2}>할일 추가</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "48%" }}>
                                <TouchableOpacity
                                    style={styles.rightInnerBtn}
                                    onPress={() => Alert.alert("right")} >
                                    <View style={{ flex: 1, ...commonStyle.rowCenter }}>
                                        <View style={commonStyle.columnCenterAlignment}>
                                            <Text style={styles.subBtnTitle}>Group + </Text>
                                            <Text style={styles.subBtnTitle2}>그룹 추가</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            }
            {/* ------------------------------------------------------------------------------ 
              * 03-2-3) Center Button 
              * 센터 버튼 클릭시 Wrapper로 애니메이션 효과부여
              *------------------------------------------------------------------------------*/}
            <Animated.View style={{
                ...styles.centerBtnWrapper,
                width: wrapperBtnSize,
                height: wrapperBtnSize,
                borderRadius: wrapperBtnSize.__getValue() * 2,
            }}>
                <View >
                    <CommonBtn onPress={toggleBtnActivate} style={{}} btnStyle={{ btnSize: CENTER_BTN_SIZE, type: 0 }} titleStyle={{ name: "1+" }} />
                </View>
            </Animated.View>
        </View >
    )
}
export default CenterTabBtn;