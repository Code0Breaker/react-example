const data = {
    currentUser:null,
    disabled: false,
    load:false
}

export default function authReducer(state = data, action){
    const temp = {...state}

        switch (action.type) {
            case 'setUser':
                temp.currentUser = action.data
                return temp
            case 'setDisabled':
                temp.disabled = action.state
                return temp
            case 'setLoad':
                temp.load = temp.load === false?true:false
                return temp
            default:
                return temp;
        }

}