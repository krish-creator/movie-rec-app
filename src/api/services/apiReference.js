import apiUrls from '../../api/utils/apiUrls.json'

const apiReference = async (serviceUrl, currentPage) => {

    const baseUrl = apiUrls.baseUrl
    const language = `?language=en-US`
    const pageUrl = `&page=${currentPage ? currentPage : 1}`
    const url = baseUrl + serviceUrl + language + pageUrl
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmYwYTBiMDc4NTAzMzc3NjIxZDllNGFjMWM0ZjI3NyIsInN1YiI6IjY0N2JiNDA4OTM4MjhlMDBiZjllNzdiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICGHO7NSDS-xjL9CHNfM-Q-T65R8AD9OIJhZbra17Ok'
        }
    };

    try {
        const res = await fetch(url, options)
        return await res.json()
    } catch (err) {
        return console.error('error:' + err)
    }

}

export default apiReference