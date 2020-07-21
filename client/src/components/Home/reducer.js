export default function (state, action) {
    switch (action.type) {
        case 'add':
        return [
            ...state, 
            {
                id: Date.now(),
            }
        ]
            break;

        default:
            return state;
            break;
    }
}