import React from "react"
import ElapsedText from "components/common/ElapsedText"
import { myCommentList } from "store/history"

import styles from 'components/settings/history/CommentHistoryItem.module.css'
import { Avatar } from "primereact/avatar"

interface CommentHistoryItemProps{
    item: myCommentList
}

const CommentHistoryItem:React.FC<CommentHistoryItemProps> = ({item}) => {
    const elapsedText = ElapsedText(item.date)
    return (
    <div className={styles.itemWrapper}>
        <Avatar className={styles.avatar} image={item.imgSrc} />
        <div className={styles.itemInfo}>
            <div className={styles.itemtitle}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.elapsedText}>{elapsedText}</p>
            </div>
            <p className={styles.comment}>{item.comment}</p>
        </div>
    </div>
    )
}

export default CommentHistoryItem