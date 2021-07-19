const zeroJoint = (content) => {
    return content > 9 ? content : '0' + content
}

export function timeFormat(time) {
    if(!time) return''
    const date = new Date(time)
    return date.getFullYear() + '-' + zeroJoint(date.getMonth() + 1) + '-' + zeroJoint(date.getDate()) + ' ' +
        zeroJoint(date.getHours()) + ':' + zeroJoint(date.getMinutes()) + ':' + zeroJoint(date.getSeconds())
}