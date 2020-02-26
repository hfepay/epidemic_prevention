const getUrl = (BASEURL) => {
  return {
    pageUrl: new RegExp(`${BASEURL}/page`),
    addUrl: new RegExp(`${BASEURL}/add`),
    updateUrl: new RegExp(`${BASEURL}/update`),
    listUrl: new RegExp(`${BASEURL}/list`),
    delAndGetUrl: new RegExp(`${BASEURL}/\\d+$`)
  }
}

export default {
  getUrl
}
