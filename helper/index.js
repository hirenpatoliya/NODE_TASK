const getPaginationValues = (obj) => {
    const { start = 0, limit = 10, sort = 'createdAt', order, search } = obj
  
    const orderBy = order && order === 'asc' ? 1 : -1
  
    const sorting = { [sort]: orderBy }
  
    return { start, limit, sorting, search }
}

module.exports = {
    getPaginationValues
}