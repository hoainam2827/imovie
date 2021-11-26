const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4c9d627239002e95fe88431488642d6c',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;