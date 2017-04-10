
export const replaceImgUrl = {
  methods: {
    replaceImgUrl (imgSrc) {
      return imgSrc.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
    }
  }
}