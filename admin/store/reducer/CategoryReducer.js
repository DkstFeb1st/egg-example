/**
 * Created by 1 on 2017/5/30.
 */
import {addCategory, deleteCategory, getSpList} from "apis/apiList";
export const addCategoryRequest = (_param) => {
    return (dispatch, getState) => {
        return addCategory(_param)
            .then(response => {
                console.log(response)
                if (response.status === 200 && response.data.status === 200) {
                    alert(response.data.msg)
                    return response.data
                } else {
                    alert(response.data.msg)
                }
            })
    }
}

export const deleteCategoryRequest = (_param) => {
    return (dispatch, getState) => {
        return deleteCategory(_param)
            .then(response => {
                console.log(response)
                if (response.status === 200 && response.data.status === 200) {
                    alert(response.data.msg)
                    return response.data
                } else {
                    alert(response.data.msg)
                }
            })
    }
}
