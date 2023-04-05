const ElapsedText = (createdTime:Date|string) => {
    const seconds = 1
    const minute = 60 * seconds
    const hour = 60 * minute
    const day = 24 * hour
    const week = 7*day

    const now = new Date()
    const elapsedTime = Math.trunc(
      (now.getTime() - new Date(createdTime).getTime()) / 1000
    )
    let elapsedText = ""
    if (elapsedTime < seconds) {
      elapsedText = "방금 전"
    } else if (elapsedTime < minute) {
      elapsedText = elapsedTime + "초 전"
    } else if (elapsedTime < hour) {
      elapsedText = Math.trunc(elapsedTime / minute) + "분 전"
    } else if (elapsedTime < day) {
      elapsedText = Math.trunc(elapsedTime / hour) + "시간 전"
    } else if (elapsedTime < day * 7) {
      elapsedText = Math.trunc(elapsedTime / day) + "일 전"
    } else {
      elapsedText = Math.trunc(elapsedTime / week) + "주 전"
    }

    return elapsedText
  }

  export default ElapsedText