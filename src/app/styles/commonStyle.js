
const commonStyle = {
    oneBackgroundColor: "#167793",
    oneBackgroundInColor: "#f2fafa",

    oneTextInColor: "#f2fafa",
    oneTextColor: "#167793",

    screenContainer: {
        margin: 10
    },
    /**
     * for new screen
     */
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    rowAlignment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    columnCenterAlignment: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    shodow:{
        shadowColor: "#000000", //그림자색
        shadowOpacity: 0.3,//그림자 투명도
        shadowOffset: { width: 2, height: 2 }, //그림자 위치
        //ANDROID
        elevation: 3,
    }
}

export default commonStyle;