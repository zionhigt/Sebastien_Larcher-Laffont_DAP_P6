class API {

    host = "localhost";
    port = "3001";
    
    async get(path) {
        const origin = `https://${this.host}${this.port?":" + this.port:""}/TMDB/${path}`
        const request = await fetch(origin);
        return await request.json();
        
    } 
    async getTopTrending() {
        return await this.get("trending");
    }
    async getCategories(many=3) {
         return await this.get("categories");
     }
    async getMovie(id) {
         return await this.get("movie/" + id);
     }
    
    getImgUrl(path) {
        return "https://image.tmdb.org/t/p/original" + path;
    }
}
export default new API()