import { ActivityIndicator } from "react-native"
import { Overlay } from "react-native-elements"
import React, { useState, useEffect, useRef, useCallback } from 'react';

const CommonLoadingActivity = ({ isVisible }) => {


    return (
        <Overlay isVisible={isVisible} backdropStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }} overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} >
            <ActivityIndicator size='large' color="#999999" />
        </Overlay>
    )
}

export default CommonLoadingActivity;