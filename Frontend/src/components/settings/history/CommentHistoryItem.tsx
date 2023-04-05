import React from "react"
import ElapsedText from "components/common/elements/ElapsedText"
import { myCommentList } from "store/history"

import styles from 'components/settings/history/CommentHistoryItem.module.css'

interface CommentHistoryItemProps{
    item: myCommentList
}

const CommentHistoryItem:React.FC<CommentHistoryItemProps> = ({item}) => {
    const elapsedText = ElapsedText(item.date)
    
    return (
    <div className={styles.itemWrapper}>
        <img className={styles.avatar} alt="" src={item.memeImage} />
        <div className={styles.itemInfo}>
            <div className={styles.itemtitle}>
                <p className={styles.title}>{item.memeTitle}</p>
                <p className={styles.elapsedText}>{elapsedText}</p>
            </div>
            <p className={styles.comment}>{item.content}</p>
        </div>
    </div>
    )
}

export default CommentHistoryItem