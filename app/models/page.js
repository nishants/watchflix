const
  defaultPageSize = 10,
  Page = (size, index)=> {
    return {
      size,
      index
    };
  };

module.exports = {
  forRequest: (request)=> {
    const
      pageSize = parseInt(request.query.size) || defaultPageSize,
      pageIndex = parseInt(request.query.page) || 0;

    return Page(pageSize, pageIndex);
  }
};