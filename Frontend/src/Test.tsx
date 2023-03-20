import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from 'store/configStore'
import { testActions } from 'store/test'

const Test: React.FC = () => {
    const dispatch = useDispatch()
    const testTitle = useSelector<RootState, string>(state => state.test.title)
    const testContents = useSelector<RootState, string>(state => state.test.contents)
    
    dispatch(testActions.test({title:'2039',contents:'42198'}))
    console.log(testTitle, testContents)
    return <></>
}

export default Test